package org.iconotecnologies.damner.service.mapper.catalogos;

import org.iconotecnologies.damner.domain.catalogos.MoscatiAccionNotification;
import org.iconotecnologies.damner.service.dto.catalogos.MoscatiAccionNotificationsDTO;
import org.iconotecnologies.damner.service.mapper.EntityMapper;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MoscatiAccionNotificationsMapper extends EntityMapper<MoscatiAccionNotificationsDTO, MoscatiAccionNotification> {
    MoscatiAccionNotification toEntity(MoscatiAccionNotificationsDTO dto);
    MoscatiAccionNotificationsDTO toDto(MoscatiAccionNotification entity);
}
