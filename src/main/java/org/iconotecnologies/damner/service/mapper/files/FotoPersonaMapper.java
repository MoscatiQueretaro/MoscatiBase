package org.iconotecnologies.damner.service.mapper.files;

import org.iconotecnologies.damner.domain.files.FotoPersona;
import org.iconotecnologies.damner.service.dto.files.FotoPersonaDTO;
import org.iconotecnologies.damner.service.mapper.EntityMapper;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FotoPersonaMapper extends EntityMapper<FotoPersonaDTO, FotoPersona> {
    FotoPersona toEntity(FotoPersonaDTO dto);
    FotoPersonaDTO toDto(FotoPersona entity);
}
