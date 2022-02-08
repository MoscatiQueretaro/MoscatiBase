package org.iconotecnologies.damner.service.mapper;

import org.iconotecnologies.damner.domain.catalogos.MoscatiAutor;
import org.iconotecnologies.damner.service.dto.MoscatiAutorDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MoscatiAutorMapper extends EntityMapper<MoscatiAutorDTO, MoscatiAutor> {}
