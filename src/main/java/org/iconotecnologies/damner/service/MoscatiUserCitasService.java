package org.iconotecnologies.damner.service;

import com.google.firebase.messaging.FirebaseMessagingException;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.time.format.TextStyle;
import java.util.*;
import org.iconotecnologies.damner.config.Constants;
import org.iconotecnologies.damner.domain.MoscatiHorariosMedicos;
import org.iconotecnologies.damner.domain.MoscatiUserCitas;
import org.iconotecnologies.damner.domain.firebase.Note;
import org.iconotecnologies.damner.repository.MoscatiUserCitasRepository;
import org.iconotecnologies.damner.service.criteria.MoscatiUserCitasCriteria;
import org.iconotecnologies.damner.service.dto.*;
import org.iconotecnologies.damner.service.mapper.MoscatiUserCitasMapper;
import org.iconotecnologies.damner.service.mapper.MoscatiUserMapper;
import org.iconotecnologies.damner.web.rest.errors.BadRequestAlertException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MoscatiUserCitasService {

    private final MoscatiUserCitasRepository repository;
    private final MoscatiUserCitasMapper mapper;
    private final MoscatiUserMapper userMapper;
    private final MoscatiNotificationsUserService notificationsUserService;
    private final MoscatiNotificationsService notificationsService;
    private final FirebaseMessagingService firebaseMessagingService;
    private final MoscatiHorariosMedicosService horariosMedicosService;

    public MoscatiUserCitasService(
        MoscatiUserCitasRepository repository,
        MoscatiUserCitasMapper mapper,
        MoscatiUserMapper userMapper,
        MoscatiNotificationsUserService notificationsUserService,
        MoscatiNotificationsService notificationsService,
        FirebaseMessagingService firebaseMessagingService,
        MoscatiHorariosMedicosService horariosMedicosService
    ) {
        this.repository = repository;
        this.mapper = mapper;
        this.userMapper = userMapper;
        this.notificationsUserService = notificationsUserService;
        this.notificationsService = notificationsService;
        this.firebaseMessagingService = firebaseMessagingService;
        this.horariosMedicosService = horariosMedicosService;
    }

    @Transactional
    public MoscatiUserCitasDTO save(MoscatiUserCitasDTO moscatiUserCitasDTO) throws FirebaseMessagingException {
        if (moscatiUserCitasDTO.getId() == null && moscatiUserCitasDTO.getEtapaCita().getDescripcion().equals(Constants.ETAPA_SOLICITUD)) {
            if (
                this.repository.findFirstByFechaHoraSolicitudEqualsOrFechaHoraCitaEqualsAndDoctor_Id(
                        StringToZoneDateTime(moscatiUserCitasDTO.getFechaHoraSolicitud()),
                        StringToZoneDateTime(moscatiUserCitasDTO.getFechaHoraSolicitud()),
                        moscatiUserCitasDTO.getDoctor().getId()
                    )
                    .orElse(null) !=
                null
            ) {
                throw new BadRequestAlertException(
                    "ya existe una Cita para esta fecha y hora, intenta agendar otra hora",
                    "moscatiUserCitasService",
                    "moscatiUserCitasError"
                );
            }

            ZonedDateTime fechaSolicitudFin = StringToZoneDateTime(moscatiUserCitasDTO.getFechaHoraSolicitud());
            fechaSolicitudFin = fechaSolicitudFin.plusMinutes(29);
            fechaSolicitudFin = fechaSolicitudFin.plusSeconds(59);
            moscatiUserCitasDTO.setFechaHoraFin(fechaSolicitudFin);

            if (
                this.repository.findAllByDoctor_IdAndFechaHoraSolicitudBetween(
                        moscatiUserCitasDTO.getDoctor().getId(),
                        StringToZoneDateTime(moscatiUserCitasDTO.getFechaHoraSolicitud()),
                        fechaSolicitudFin
                    )
                    .size() >
                0 ||
                this.repository.findAllByDoctor_IdAndFechaHoraFinBetween(
                        moscatiUserCitasDTO.getDoctor().getId(),
                        StringToZoneDateTime(moscatiUserCitasDTO.getFechaHoraSolicitud()),
                        fechaSolicitudFin
                    )
                    .size() >
                0
            ) {
                throw new BadRequestAlertException(
                    "ya existe una Cita para " +
                    getFechaHora(moscatiUserCitasDTO.getFechaHoraSolicitud(), moscatiUserCitasDTO.getUser().getLanguage()) +
                    ", intenta agendar otra hora",
                    "moscatiUserCitasService",
                    ""
                );
            }
        }
        if (moscatiUserCitasDTO.getId() != null && moscatiUserCitasDTO.getEtapaCita().getDescripcion().equals(Constants.ETAPA_CITA)) {
            moscatiUserCitasDTO.setAgoraChanel(generateAgoraChanel());
        }
        MoscatiUserCitas moscatiUserCitas = this.repository.save(this.mapper.toEntity(moscatiUserCitasDTO));

        MoscatiNotificationsDTO notificationautor;
        MoscatiNotificationsUserDTO notificationUser = new MoscatiNotificationsUserDTO();
        if (moscatiUserCitas.getId() != null && moscatiUserCitas.getEtapaCita().getDescripcion().equals(Constants.ETAPA_SOLICITUD)) {
            String fechahraSolicitud = "";
            if (moscatiUserCitasDTO.getFechaHoraSolicitud() != null) {
                fechahraSolicitud = getFechaHora(moscatiUserCitasDTO.getFechaHoraSolicitud(), moscatiUserCitas.getDoctor().getLanguage());
            }
            notificationautor =
                saveNotificationAutor(
                    this.userMapper.toDto(moscatiUserCitas.getUser()),
                    moscatiUserCitas.getUser().getName() +
                    " " +
                    moscatiUserCitas.getUser().getFirstName() +
                    " " +
                    moscatiUserCitas.getUser().getLastName() +
                    " " +
                    Constants.DEFAULT_SOLICITUD_CITA_ES +
                    " " +
                    fechahraSolicitud,
                    Constants.DEFAULT_SOLICITUD_CITA_TITLE_ES
                );

            if (notificationautor.getId() != null) {
                notificationUser.setFecha(ZonedDateTime.now());
                notificationUser.setUserId(this.userMapper.toDto(moscatiUserCitas.getDoctor()));
                notificationUser.setNotificacion(notificationautor);
                notificationUser.setVista(false);
                this.notificationsUserService.save(notificationUser);
                //*********************************************************************************************************
                //se envia la notificación con Firebase Api para distribuirla al dispositivo asociado con el token
                //*********************************************************************************************************
                if (moscatiUserCitasDTO.getDoctor().getFirebaseToken() != null) {
                    Note FireBaseNotification = new Note();
                    FireBaseNotification.setSubject(Constants.DEFAULT_SOLICITUD_CITA_TITLE_ES);
                    FireBaseNotification.setContent(
                        moscatiUserCitas.getUser().getName() +
                        " " +
                        moscatiUserCitas.getUser().getFirstName() +
                        " " +
                        moscatiUserCitas.getUser().getLastName() +
                        " " +
                        Constants.DEFAULT_SOLICITUD_CITA_ES +
                        " " +
                        fechahraSolicitud
                    );
                    FireBaseNotification.setImage("https://laboratoriomoscati.xystems.com.mx/recursos/images/logo.jpg");
                    Map<String, String> data = new HashMap<>();
                    data.put("id", "2");
                    data.put("click_action", "FLUTTER_NOTIFICATION_CLICK");
                    data.put("status", "Crime_And_Safety");
                    FireBaseNotification.setData(data);
                    try {
                        firebaseMessagingService.sendNotification(FireBaseNotification, moscatiUserCitasDTO.getDoctor().getFirebaseToken());
                    } catch (Exception e) {
                        System.out.println("a ocurrido un error con FireBase Plugin, error:" + e);
                    }
                }
            }
        }

        if (moscatiUserCitas.getId() != null && moscatiUserCitas.getEtapaCita().getDescripcion().equals(Constants.ETAPA_CITA)) {
            String fechahraSolicitud = "";
            if (moscatiUserCitasDTO.getFechaHoraCita() != null) {
                fechahraSolicitud = getFechaHora(moscatiUserCitasDTO.getFechaHoraCita(), moscatiUserCitas.getUser().getLanguage());
            }
            notificationautor =
                saveNotificationAutor(
                    this.userMapper.toDto(moscatiUserCitas.getDoctor()),
                    moscatiUserCitas.getDoctor().getName() +
                    " " +
                    moscatiUserCitas.getDoctor().getFirstName() +
                    " " +
                    moscatiUserCitas.getDoctor().getLastName() +
                    " " +
                    Constants.DEFAULT_CITA_ES +
                    " " +
                    fechahraSolicitud,
                    Constants.DEFAULT_CITA_TITLE_ES
                );

            if (notificationautor.getId() != null) {
                notificationUser.setFecha(ZonedDateTime.now());
                notificationUser.setUserId(this.userMapper.toDto(moscatiUserCitas.getUser()));
                notificationUser.setNotificacion(notificationautor);
                notificationUser.setVista(false);
                this.notificationsUserService.save(notificationUser);

                //*********************************************************************************************************
                //se envia la notificación con Firebase Api para distribuirla al dispositivo asociado con el token
                //*********************************************************************************************************
                if (moscatiUserCitasDTO.getUser().getFirebaseToken() != null) {
                    Note FireBaseNotification = new Note();
                    FireBaseNotification.setSubject(Constants.DEFAULT_CITA_TITLE_ES);
                    FireBaseNotification.setContent(
                        moscatiUserCitas.getDoctor().getName() +
                        " " +
                        moscatiUserCitas.getDoctor().getFirstName() +
                        " " +
                        moscatiUserCitas.getDoctor().getLastName() +
                        " " +
                        Constants.DEFAULT_CITA_ES +
                        " " +
                        fechahraSolicitud
                    );
                    FireBaseNotification.setImage("https://laboratoriomoscati.xystems.com.mx/recursos/images/logo.jpg");
                    Map<String, String> data = new HashMap<>();
                    data.put("id", "2");
                    data.put("click_action", "FLUTTER_NOTIFICATION_CLICK");
                    data.put("status", "Crime_And_Safety");
                    FireBaseNotification.setData(data);
                    try {
                        firebaseMessagingService.sendNotification(FireBaseNotification, moscatiUserCitasDTO.getUser().getFirebaseToken());
                    } catch (Exception e) {
                        System.out.println("a ocurrido un error con FireBase Plugin, error:" + e);
                    }
                }
            }
        }

        return this.mapper.toDto(moscatiUserCitas);
    }

    public String getFechaHora(String fechaHora, String languague) {
        String fechahraSolicitud;
        ZonedDateTime fechaSolicitud = StringToZoneDateTime(fechaHora);
        String timeMedium = fechaSolicitud.format(DateTimeFormatter.ofLocalizedTime(FormatStyle.LONG));
        timeMedium = timeMedium.replace("CST", "");
        timeMedium = timeMedium + " " + ((fechaSolicitud.getHour() > 12) ? "PM" : "AM");
        fechahraSolicitud =
            fechaSolicitud.getDayOfWeek().getDisplayName(TextStyle.FULL, new Locale(languague, languague.toUpperCase())) +
            " " +
            fechaSolicitud.getDayOfMonth() +
            "/" +
            fechaSolicitud.getMonth().getValue() +
            "/" +
            fechaSolicitud.getYear() +
            " " +
            timeMedium;
        return fechahraSolicitud;
    }

    @Transactional(readOnly = true)
    public List<MoscatiHorariosDisponiblesDTO> getHorariosDisponibles(MoscatiUserCitasDTO moscatiUserCitasDTO) {
        List<MoscatiHorariosDisponiblesDTO> horariosList = new ArrayList<>();
        if (moscatiUserCitasDTO.getId() == null) {
            if (
                this.repository.findFirstByFechaHoraSolicitudEqualsOrFechaHoraCitaEqualsAndDoctor_Id(
                        StringToZoneDateTime(moscatiUserCitasDTO.getFechaHoraSolicitud()),
                        StringToZoneDateTime(moscatiUserCitasDTO.getFechaHoraSolicitud()),
                        moscatiUserCitasDTO.getDoctor().getId()
                    )
                    .orElse(null) !=
                null
            ) {
                horariosList = getListHorariosDisponibles(moscatiUserCitasDTO);
            }

            ZonedDateTime fechaSolicitudFin = StringToZoneDateTime(moscatiUserCitasDTO.getFechaHoraSolicitud());
            fechaSolicitudFin = fechaSolicitudFin.plusMinutes(29);
            fechaSolicitudFin = fechaSolicitudFin.plusSeconds(59);
            moscatiUserCitasDTO.setFechaHoraFin(fechaSolicitudFin);

            if (
                this.repository.findAllByDoctor_IdAndFechaHoraSolicitudBetween(
                        moscatiUserCitasDTO.getDoctor().getId(),
                        StringToZoneDateTime(moscatiUserCitasDTO.getFechaHoraSolicitud()),
                        fechaSolicitudFin
                    )
                    .size() >
                0 ||
                this.repository.findAllByDoctor_IdAndFechaHoraFinBetween(
                        moscatiUserCitasDTO.getDoctor().getId(),
                        StringToZoneDateTime(moscatiUserCitasDTO.getFechaHoraSolicitud()),
                        fechaSolicitudFin
                    )
                    .size() >
                0
            ) {
                horariosList = getListHorariosDisponibles(moscatiUserCitasDTO);
            }
        }
        return horariosList;
    }

    public List<MoscatiHorariosDisponiblesDTO> getListHorariosDisponibles(MoscatiUserCitasDTO moscatiUserCitasDTO) {
        List<MoscatiHorariosMedicosDTO> horariosMedicos =
            this.horariosMedicosService.findAllByUserId(moscatiUserCitasDTO.getDoctor().getId());
        ZonedDateTime fechaHoraSolicitud = StringToZoneDateTime(moscatiUserCitasDTO.getFechaHoraSolicitud());
        List<MoscatiHorariosDisponiblesDTO> horariosList = new ArrayList<>();

        MoscatiHorariosMedicosDTO jornada = horariosMedicos
            .stream()
            .filter(dias -> dias.getDia() == fechaHoraSolicitud.getDayOfWeek().getValue())
            .findFirst()
            .orElse(null);

        for (
            int i = StringToZoneDateTime(jornada.getHoraInicio()).getHour();
            i <= StringToZoneDateTime(jornada.getHoraFin()).getHour();
            i++
        ) {
            ZonedDateTime fechaHora = ZonedDateTime.of(
                LocalDate.of(fechaHoraSolicitud.getYear(), fechaHoraSolicitud.getMonth().getValue(), fechaHoraSolicitud.getDayOfMonth()),
                LocalTime.of(
                    i,
                    (StringToZoneDateTime(jornada.getHoraInicio()).getMinute() > 0)
                        ? StringToZoneDateTime(jornada.getHoraInicio()).getMinute()
                        : 0
                ),
                ZoneId.systemDefault()
            );

            ZonedDateTime fechaSolicitudFin = fechaHora;
            fechaSolicitudFin = fechaSolicitudFin.plusMinutes(29);
            fechaSolicitudFin = fechaSolicitudFin.plusSeconds(59);
            moscatiUserCitasDTO.setFechaHoraFin(fechaSolicitudFin);

            if (
                this.repository.findAllByDoctor_IdAndFechaHoraSolicitudBetween(
                        moscatiUserCitasDTO.getDoctor().getId(),
                        fechaHora,
                        fechaSolicitudFin
                    )
                    .size() <=
                0 ||
                this.repository.findAllByDoctor_IdAndFechaHoraFinBetween(
                        moscatiUserCitasDTO.getDoctor().getId(),
                        fechaHora,
                        fechaSolicitudFin
                    )
                    .size() <=
                0
            ) {
                MoscatiHorariosDisponiblesDTO horarioDisponible = new MoscatiHorariosDisponiblesDTO();
                horarioDisponible.setHorarioSolicitud(convertZoneDateTimeToString(fechaHora));
                horarioDisponible.setEstatus("DISPONIBLE");
                horariosList.add(horarioDisponible);
            } else {
                MoscatiHorariosDisponiblesDTO horarioDisponible = new MoscatiHorariosDisponiblesDTO();
                horarioDisponible.setHorarioSolicitud(convertZoneDateTimeToString(fechaHora));
                horarioDisponible.setEstatus("OCUPADO");
                horariosList.add(horarioDisponible);
            }

            if (i < StringToZoneDateTime(jornada.getHoraFin()).getHour()) {
                fechaHora = fechaHora.plusMinutes(30);
                fechaSolicitudFin = fechaSolicitudFin.plusMinutes(30);

                if (
                    this.repository.findAllByDoctor_IdAndFechaHoraSolicitudBetween(
                            moscatiUserCitasDTO.getDoctor().getId(),
                            fechaHora,
                            fechaSolicitudFin
                        )
                        .size() <=
                    0 ||
                    this.repository.findAllByDoctor_IdAndFechaHoraFinBetween(
                            moscatiUserCitasDTO.getDoctor().getId(),
                            fechaHora,
                            fechaSolicitudFin
                        )
                        .size() <=
                    0
                ) {
                    MoscatiHorariosDisponiblesDTO horarioDisponible = new MoscatiHorariosDisponiblesDTO();
                    horarioDisponible.setHorarioSolicitud(convertZoneDateTimeToString(fechaHora));
                    horarioDisponible.setEstatus("DISPONIBLE");
                    horariosList.add(horarioDisponible);
                } else {
                    MoscatiHorariosDisponiblesDTO horarioDisponible = new MoscatiHorariosDisponiblesDTO();
                    horarioDisponible.setHorarioSolicitud(convertZoneDateTimeToString(fechaHora));
                    horarioDisponible.setEstatus("OCUPADO");
                    horariosList.add(horarioDisponible);
                }
            }
        }
        return horariosList;
    }

    @Transactional
    public MoscatiNotificationsDTO saveNotificationAutor(MoscatiUserDTO autor, String descrpcion, String titulo) {
        MoscatiNotificationsDTO notificationautor = new MoscatiNotificationsDTO();
        notificationautor.setAutor(autor);
        notificationautor.setDescripcion(descrpcion);
        notificationautor.setFecha(ZonedDateTime.now());
        notificationautor.setTitulo(titulo);
        notificationautor = notificationsService.save(notificationautor);
        return notificationautor;
    }

    protected String generateAgoraChanel() {
        String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        StringBuilder salt = new StringBuilder();
        Random rnd = new Random();
        while (salt.length() < 18) { // length of the random string.
            int index = (int) (rnd.nextFloat() * SALTCHARS.length());
            salt.append(SALTCHARS.charAt(index));
        }
        String saltStr = salt.toString();
        return saltStr;
    }

    //    @Transactional(readOnly = true)
    //    public List<MoscatiUserCitasDTO> findAllByEspecialidad(Integer id) {
    //        List<MoscatiUserCitas> moscatiDirectorioMedico = this.repository.findAllByEspecialidad_Id(id);
    //        return this.mapper.toDto(moscatiDirectorioMedico);
    //    }

    @Transactional(readOnly = true)
    public List<MoscatiUserCitasDTO> findAllPost() {
        List<MoscatiUserCitas> moscatiUserCitas = this.repository.findAll();
        return this.mapper.toDto(moscatiUserCitas);
    }

    @Transactional(readOnly = true)
    public MoscatiUserCitasDTO findOneById(Integer id) {
        MoscatiUserCitas cita = this.repository.findFirstById(id);
        return this.mapper.toDto(cita);
    }

    @Transactional(readOnly = true)
    public Page<MoscatiUserCitasDTO> getAll(MoscatiUserCitasCriteria criteria, Pageable pageable) {
        Page<MoscatiUserCitasDTO> pageableMoscatiUserCitas =
            this.repository.findAll(criteria.buildSpecification(), pageable).map(mapper::toDto);
        return pageableMoscatiUserCitas;
    }

    public ZonedDateTime StringToZoneDateTime(String fecha) {
        if (fecha != null) {
            ZoneId timeZone = ZoneId.systemDefault();
            fecha = fecha.replace(" ", "T");
            System.out.println(LocalDateTime.parse(fecha, DateTimeFormatter.ISO_DATE_TIME).atZone(timeZone));
            ZonedDateTime zdtWithZoneOffset = LocalDateTime.parse(fecha, DateTimeFormatter.ISO_DATE_TIME).atZone(timeZone);
            return zdtWithZoneOffset;
        } else {
            return null;
        }
    }

    public String convertZoneDateTimeToString(ZonedDateTime fecha) {
        if (fecha != null) {
            ZonedDateTime utcZoned = fecha;
            ZoneId swissZone = ZoneId.systemDefault();
            ZonedDateTime swissZoned = utcZoned.withZoneSameInstant(swissZone);
            LocalDateTime swissLocal = swissZoned.toLocalDateTime();
            String finalDateTime = swissLocal.toString() + utcZoned.getOffset();
            return finalDateTime;
        } else {
            return null;
        }
    }
}
