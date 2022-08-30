package org.iconotecnologies.damner.service.mapper;

import org.iconotecnologies.damner.domain.MoscatiStripeEtapa;
import org.iconotecnologies.damner.service.dto.MoscatiStripeEtapaDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MoscatiStripeEtapaMapper extends EntityMapper<MoscatiStripeEtapaDTO, MoscatiStripeEtapa> {
    MoscatiStripeEtapa toEntity(MoscatiStripeEtapaDTO dto);
    MoscatiStripeEtapaDTO toDto(MoscatiStripeEtapa entity);
}
