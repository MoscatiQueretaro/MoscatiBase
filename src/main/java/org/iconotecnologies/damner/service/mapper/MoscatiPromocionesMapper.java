package org.iconotecnologies.damner.service.mapper;

import org.iconotecnologies.damner.domain.MoscatiPromociones;
import org.iconotecnologies.damner.service.dto.MoscatiPromocionesDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MoscatiPromocionesMapper extends EntityMapper<MoscatiPromocionesDTO, MoscatiPromociones> {
    MoscatiPromociones toEntity(MoscatiPromocionesDTO dto);
    MoscatiPromocionesDTO toDto(MoscatiPromociones entity);
}
