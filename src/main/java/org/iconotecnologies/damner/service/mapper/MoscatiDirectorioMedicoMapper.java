package org.iconotecnologies.damner.service.mapper;

import org.iconotecnologies.damner.domain.MoscatiDirectorioMedico;
import org.iconotecnologies.damner.service.dto.MoscatiDirectorioMedicoDTO;
import org.iconotecnologies.damner.service.mapper.catalogos.MoscatiEspecialidadesMapper;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = { MoscatiUserMapper.class, MoscatiEspecialidadesMapper.class })
public interface MoscatiDirectorioMedicoMapper extends EntityMapper<MoscatiDirectorioMedicoDTO, MoscatiDirectorioMedico> {
    MoscatiDirectorioMedico toEntity(MoscatiDirectorioMedicoDTO dto);
    MoscatiDirectorioMedicoDTO toDto(MoscatiDirectorioMedico entity);
}
