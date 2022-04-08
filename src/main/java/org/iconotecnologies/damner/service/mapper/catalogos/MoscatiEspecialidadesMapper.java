package org.iconotecnologies.damner.service.mapper.catalogos;

import org.iconotecnologies.damner.domain.catalogos.MoscatiEspecialidades;
import org.iconotecnologies.damner.service.dto.catalogos.MoscatiEspecialidadesDTO;
import org.iconotecnologies.damner.service.mapper.EntityMapper;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MoscatiEspecialidadesMapper extends EntityMapper<MoscatiEspecialidadesDTO, MoscatiEspecialidades> {
    MoscatiEspecialidades toEntity(MoscatiEspecialidadesDTO dto);
    MoscatiEspecialidadesDTO toDto(MoscatiEspecialidades entity);
}
