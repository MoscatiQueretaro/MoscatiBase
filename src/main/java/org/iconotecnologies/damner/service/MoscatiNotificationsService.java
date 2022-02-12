package org.iconotecnologies.damner.service;

import java.util.List;
import org.iconotecnologies.damner.domain.MoscatiNotifications;
import org.iconotecnologies.damner.domain.MoscatiUser;
import org.iconotecnologies.damner.repository.MoscatiNotificationsRepository;
import org.iconotecnologies.damner.service.dto.MoscatiNotificationsDTO;
import org.iconotecnologies.damner.service.dto.MoscatiUserDTO;
import org.iconotecnologies.damner.service.mapper.MoscatiNotificationsMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MoscatiNotificationsService {

    private final MoscatiNotificationsRepository repository;
    private final MoscatiNotificationsMapper mapper;
    private final UserService userService;

    public MoscatiNotificationsService(
        MoscatiNotificationsRepository repository,
        MoscatiNotificationsMapper mapper,
        UserService userService
    ) {
        this.repository = repository;
        this.mapper = mapper;
        this.userService = userService;
    }

    @Transactional
    public MoscatiNotificationsDTO save(MoscatiNotificationsDTO dto) {
        MoscatiUserDTO userDTO = this.userService.getUserWithAuthorities();
        dto.setAutor(userDTO);
        MoscatiNotifications moscatiNotifications = this.repository.save(this.mapper.toEntity(dto));
        return this.mapper.toDto(moscatiNotifications);
    }

    //    @Transactional(readOnly = true)
    //    public List<MoscatiNotificationsDTO> findAllPostByUser(String id) {
    //        List<MoscatiNotifications> moscatiPromociones = this.repository.findAllByAutorOrderByVigenciaAsc(id);
    //        return this.mapper.toDto(moscatiPromociones);
    //    }

    @Transactional(readOnly = true)
    public List<MoscatiNotificationsDTO> findAllPost() {
        List<MoscatiNotifications> moscatiPromociones = this.repository.findAll();
        return this.mapper.toDto(moscatiPromociones);
    }
    //    @Transactional(readOnly = true)
    //    public Page<MoscatiNotificationsDTO> getAll(MoscatiNotificationsCriteria criteria, Pageable pageable) {
    //        return this.repository.findAll(criteria.buildSpecification(), pageable).map(mapper::toDto);
    //    }

}
