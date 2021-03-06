package org.iconotecnologies.damner.service;

import java.util.List;
import org.iconotecnologies.damner.domain.MoscatiNotificationsUser;
import org.iconotecnologies.damner.repository.MoscatiNotificationsUserRepository;
import org.iconotecnologies.damner.service.dto.MessageAndNotificationsDTO;
import org.iconotecnologies.damner.service.dto.MoscatiNotificationsUserDTO;
import org.iconotecnologies.damner.service.dto.files.FotoPersonaDTO;
import org.iconotecnologies.damner.service.files.FotoPersonaService;
import org.iconotecnologies.damner.service.mapper.MoscatiNotificationsUserMapper;
import org.iconotecnologies.damner.service.mapper.files.FotoPersonaMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MoscatiNotificationsUserService {

    private final MoscatiNotificationsUserRepository repository;
    private final MoscatiNotificationsUserMapper mapper;
    private final FotoPersonaMapper fotoPersonaMapper;
    private final FotoPersonaService fotoPersonaService;

    public MoscatiNotificationsUserService(
        MoscatiNotificationsUserRepository repository,
        MoscatiNotificationsUserMapper mapper,
        FotoPersonaMapper fotoPersonaMapper,
        FotoPersonaService fotoPersonaService
    ) {
        this.repository = repository;
        this.mapper = mapper;
        this.fotoPersonaMapper = fotoPersonaMapper;
        this.fotoPersonaService = fotoPersonaService;
    }

    @Transactional
    public MoscatiNotificationsUserDTO save(MoscatiNotificationsUserDTO dto) {
        MoscatiNotificationsUser moscatiNotifications = this.repository.save(this.mapper.toEntity(dto));
        return this.mapper.toDto(moscatiNotifications);
    }

    @Transactional(readOnly = true)
    public List<MoscatiNotificationsUserDTO> findAllNotificationsByUser(Long id) {
        List<MoscatiNotificationsUser> moscatiNotifications = this.repository.findAllByUserId_Id(id);
        List<MoscatiNotificationsUserDTO> notificationsDTO = this.mapper.toDto(moscatiNotifications);
        return notificationsDTO;
    }

    @Transactional(readOnly = true)
    public MessageAndNotificationsDTO findAllNotificationsAndMessagesByUser(Long id) {
        MessageAndNotificationsDTO notificationsAndMessagesDTO = new MessageAndNotificationsDTO();
        Integer notifications = this.repository.countAllByUserId_Id(id);
        notificationsAndMessagesDTO.setNotificationsNum(notifications);
        notificationsAndMessagesDTO.setMessagesNum(0);
        return notificationsAndMessagesDTO;
    }
}
