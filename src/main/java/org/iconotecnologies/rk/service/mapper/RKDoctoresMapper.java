package org.iconotecnologies.rk.service.mapper;

import org.iconotecnologies.damner.service.mapper.EntityMapper;
import org.iconotecnologies.rk.domain.RKDoctores;
import org.iconotecnologies.rk.service.dto.RKDoctoresDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RKDoctoresMapper extends EntityMapper<RKDoctoresDTO, RKDoctores> {
    RKDoctores toEntity(RKDoctoresDTO dto);
    RKDoctoresDTO toDto(RKDoctores entity);
}
