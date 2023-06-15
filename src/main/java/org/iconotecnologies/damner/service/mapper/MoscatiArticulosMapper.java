package org.iconotecnologies.damner.service.mapper;

import org.iconotecnologies.damner.domain.MoscatiArticulos;
import org.iconotecnologies.damner.service.dto.MoscatiArticulosDTO;
import org.iconotecnologies.damner.service.mapper.files.FotoPersonaMapper;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = { FotoPersonaMapper.class, MoscatiUserMapper.class })
public interface MoscatiArticulosMapper extends EntityMapper<MoscatiArticulosDTO, MoscatiArticulos> {
    MoscatiArticulos toEntity(MoscatiArticulosDTO dto);
    MoscatiArticulosDTO toDto(MoscatiArticulos entity);
}
