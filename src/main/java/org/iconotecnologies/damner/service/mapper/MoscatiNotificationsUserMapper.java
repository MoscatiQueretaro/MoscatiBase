package org.iconotecnologies.damner.service.mapper;

import org.iconotecnologies.damner.domain.MoscatiNotificationsUser;
import org.iconotecnologies.damner.service.dto.MoscatiNotificationsUserDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = { MoscatiNotificationsMapper.class, MoscatiUserMapper.class })
public interface MoscatiNotificationsUserMapper extends EntityMapper<MoscatiNotificationsUserDTO, MoscatiNotificationsUser> {
    MoscatiNotificationsUser toEntity(MoscatiNotificationsUserDTO dto);
    MoscatiNotificationsUserDTO toDto(MoscatiNotificationsUser entity);
}
