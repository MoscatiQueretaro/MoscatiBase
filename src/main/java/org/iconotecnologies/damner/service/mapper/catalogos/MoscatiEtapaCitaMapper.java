package org.iconotecnologies.damner.service.mapper.catalogos;

import org.iconotecnologies.damner.domain.catalogos.MoscatiEtapaCita;
import org.iconotecnologies.damner.service.dto.catalogos.MoscatiEtapaCitaDTO;
import org.iconotecnologies.damner.service.mapper.EntityMapper;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MoscatiEtapaCitaMapper extends EntityMapper<MoscatiEtapaCitaDTO, MoscatiEtapaCita> {
    MoscatiEtapaCita toEntity(MoscatiEtapaCitaDTO dto);
    MoscatiEtapaCitaDTO toDto(MoscatiEtapaCita entity);
}
