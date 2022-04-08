package org.iconotecnologies.damner.service;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;
import java.util.Random;
import org.iconotecnologies.damner.config.Constants;
import org.iconotecnologies.damner.domain.MoscatiUserCitas;
import org.iconotecnologies.damner.domain.catalogos.MoscatiEspecialidades;
import org.iconotecnologies.damner.repository.MoscatiUserCitasRepository;
import org.iconotecnologies.damner.service.criteria.MoscatiUserCitasCriteria;
import org.iconotecnologies.damner.service.dto.MoscatiNotificationsDTO;
import org.iconotecnologies.damner.service.dto.MoscatiNotificationsUserDTO;
import org.iconotecnologies.damner.service.dto.MoscatiUserCitasDTO;
import org.iconotecnologies.damner.service.dto.MoscatiUserDTO;
import org.iconotecnologies.damner.service.dto.catalogos.MoscatiEspecialidadesDTO;
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

    public MoscatiUserCitasService(
        MoscatiUserCitasRepository repository,
        MoscatiUserCitasMapper mapper,
        MoscatiUserMapper userMapper,
        MoscatiNotificationsUserService notificationsUserService,
        MoscatiNotificationsService notificationsService
    ) {
        this.repository = repository;
        this.mapper = mapper;
        this.userMapper = userMapper;
        this.notificationsUserService = notificationsUserService;
        this.notificationsService = notificationsService;
    }

    @Transactional
    public MoscatiUserCitasDTO save(MoscatiUserCitasDTO moscatiUserCitasDTO) {
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
                    ""
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
}
