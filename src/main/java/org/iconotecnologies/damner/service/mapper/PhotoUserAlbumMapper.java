package org.iconotecnologies.damner.service.mapper;

import org.iconotecnologies.damner.domain.files.PhotoUserAlbum;
import org.iconotecnologies.damner.service.dto.files.PhotoUserAlbumDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PhotoUserAlbumMapper extends EntityMapper<PhotoUserAlbumDTO, PhotoUserAlbum> {}
