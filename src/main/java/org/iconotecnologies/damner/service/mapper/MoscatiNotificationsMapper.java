package org.iconotecnologies.damner.service.mapper;

import org.iconotecnologies.damner.domain.MoscatiNotifications;
import org.iconotecnologies.damner.service.dto.MoscatiNotificationsDTO;
import org.iconotecnologies.damner.service.mapper.catalogos.MoscatiAccionNotificationsMapper;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = { MoscatiUserMapper.class, MoscatiAccionNotificationsMapper.class })
public interface MoscatiNotificationsMapper extends EntityMapper<MoscatiNotificationsDTO, MoscatiNotifications> {
    MoscatiNotifications toEntity(MoscatiNotificationsDTO dto);
    MoscatiNotificationsDTO toDto(MoscatiNotifications entity);
}
