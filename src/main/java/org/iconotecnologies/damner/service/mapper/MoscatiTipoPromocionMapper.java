package org.iconotecnologies.damner.service.mapper;

import org.iconotecnologies.damner.domain.MoscatiTipoPromocion;
import org.iconotecnologies.damner.service.dto.MoscatiTipoPromocionDTO;

public interface MoscatiTipoPromocionMapper extends EntityMapper<MoscatiTipoPromocionDTO, MoscatiTipoPromocion> {
    MoscatiTipoPromocion toEntity(MoscatiTipoPromocionDTO dto);
    MoscatiTipoPromocionDTO toDto(MoscatiTipoPromocion entity);
}
