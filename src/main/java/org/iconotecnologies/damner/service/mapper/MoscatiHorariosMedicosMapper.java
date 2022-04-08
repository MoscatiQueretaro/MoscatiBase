package org.iconotecnologies.damner.service.mapper;

import org.iconotecnologies.damner.domain.MoscatiHorariosMedicos;
import org.iconotecnologies.damner.service.dto.MoscatiHorariosMedicosDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = { MoscatiUserMapper.class, ConvertStringToZoneDateTimeMapper.class })
public interface MoscatiHorariosMedicosMapper extends EntityMapper<MoscatiHorariosMedicosDTO, MoscatiHorariosMedicos> {
    @Mapping(source = "horaFin", target = "horaFin", qualifiedByName = "convertStringToZoneDateTime")
    @Mapping(source = "horaInicio", target = "horaInicio", qualifiedByName = "convertStringToZoneDateTime")
    MoscatiHorariosMedicos toEntity(MoscatiHorariosMedicosDTO dto);

    @Mapping(source = "horaFin", target = "horaFin", qualifiedByName = "convertZoneDateTimeToString")
    @Mapping(source = "horaInicio", target = "horaInicio", qualifiedByName = "convertZoneDateTimeToString")
    MoscatiHorariosMedicosDTO toDto(MoscatiHorariosMedicos entity);
}
