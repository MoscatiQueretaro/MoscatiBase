package org.iconotecnologies.damner.service.mapper;

import org.iconotecnologies.damner.domain.MoscatiUserCitas;
import org.iconotecnologies.damner.service.dto.MoscatiUserCitasDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(
    componentModel = "spring",
    uses = { MoscatiUserMapper.class, ConvertStringToZoneDateTimeMapper.class, MoscatiPagosStripeMapper.class }
)
public interface MoscatiUserCitasMapper extends EntityMapper<MoscatiUserCitasDTO, MoscatiUserCitas> {
    @Mapping(source = "fechaHoraSolicitud", target = "fechaHoraSolicitud", qualifiedByName = "convertStringToZoneDateTime")
    @Mapping(source = "fechaHoraCita", target = "fechaHoraCita", qualifiedByName = "convertStringToZoneDateTime")
    MoscatiUserCitas toEntity(MoscatiUserCitasDTO dto);

    @Mapping(source = "fechaHoraSolicitud", target = "fechaHoraSolicitud", qualifiedByName = "convertZoneDateTimeToString")
    @Mapping(source = "fechaHoraCita", target = "fechaHoraCita", qualifiedByName = "convertZoneDateTimeToString")
    MoscatiUserCitasDTO toDto(MoscatiUserCitas entity);
}
