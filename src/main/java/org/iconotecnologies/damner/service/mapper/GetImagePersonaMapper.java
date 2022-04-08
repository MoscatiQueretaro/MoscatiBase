package org.iconotecnologies.damner.service.mapper;

import org.iconotecnologies.damner.service.dto.files.FotoPersonaDTO;
import org.iconotecnologies.damner.service.files.FotoPersonaService;
import org.iconotecnologies.damner.service.mapper.files.FotoPersonaMapper;
import org.mapstruct.Named;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class GetImagePersonaMapper {

    private final FotoPersonaService service;
    private final FotoPersonaMapper mapper;

    public GetImagePersonaMapper(FotoPersonaService service, FotoPersonaMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @Transactional(readOnly = true)
    @Named("getImagePersona")
    public FotoPersonaDTO getImagePersona(String imageProfile) {
        FotoPersonaDTO fotoPersonaDTO;
        if (imageProfile != null) {
            fotoPersonaDTO = this.mapper.toDto(this.service.findOne(imageProfile));
        } else {
            fotoPersonaDTO = null;
        }
        return fotoPersonaDTO;
    }
}
