package org.iconotecnologies.damner.service.mapper;

import org.iconotecnologies.damner.domain.MoscatiMedicamentos;
import org.iconotecnologies.damner.service.dto.MoscatiMedicamentosDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MoscatiMedicamentosMapper extends EntityMapper<MoscatiMedicamentosDTO, MoscatiMedicamentos> {
    MoscatiMedicamentosDTO toDto(MoscatiMedicamentos entity);
    MoscatiMedicamentos toEntity(MoscatiMedicamentosDTO dto);
}
