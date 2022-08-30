package org.iconotecnologies.damner.service.mapper;

import org.iconotecnologies.damner.domain.MoscatiPagosStripe;
import org.iconotecnologies.damner.service.dto.MoscatiPagosStripeDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = { MoscatiStripeEtapaMapper.class })
public interface MoscatiPagosStripeMapper extends EntityMapper<MoscatiPagosStripeDTO, MoscatiPagosStripe> {
    MoscatiPagosStripe toEntity(MoscatiPagosStripeDTO dto);
    MoscatiPagosStripeDTO toDto(MoscatiPagosStripe entity);
}
