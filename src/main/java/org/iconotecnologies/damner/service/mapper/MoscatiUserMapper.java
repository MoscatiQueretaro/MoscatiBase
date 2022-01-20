package org.iconotecnologies.damner.service.mapper;

import org.iconotecnologies.damner.domain.MoscatiUser;
import org.iconotecnologies.damner.service.dto.MoscatiUserDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MoscatiUserMapper extends EntityMapper<MoscatiUserDTO, MoscatiUser> {
    @Mapping(target = "authorities", ignore = true)
    MoscatiUserDTO toDto(MoscatiUser entity);

    @Mapping(target = "authorities", ignore = true)
    MoscatiUser toEntity(MoscatiUserDTO dto);
}
