package org.iconotecnologies.damner.service.mapper;

import org.iconotecnologies.damner.domain.DamnerUser;
import org.iconotecnologies.damner.service.dto.DamnerUserDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface DamnerUserMapper extends EntityMapper<DamnerUserDTO, DamnerUser> {
    @Mapping(target = "authorities", ignore = true)
    DamnerUserDTO toDto(DamnerUser entity);

    @Mapping(target = "authorities", ignore = true)
    DamnerUser toEntity(DamnerUserDTO dto);
}
