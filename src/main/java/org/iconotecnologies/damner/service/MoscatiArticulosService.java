package org.iconotecnologies.damner.service;

import org.iconotecnologies.damner.domain.MoscatiArticulos;
import org.iconotecnologies.damner.repository.MoscatiArticulosRepository;
import org.iconotecnologies.damner.service.criteria.MoscatiArticulosCriteria;
import org.iconotecnologies.damner.service.dto.MoscatiArticulosDTO;
import org.iconotecnologies.damner.service.dto.files.FotoPersonaDTO;
import org.iconotecnologies.damner.service.files.FotoPersonaService;
import org.iconotecnologies.damner.service.mapper.MoscatiArticulosMapper;
import org.iconotecnologies.damner.service.mapper.files.FotoPersonaMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MoscatiArticulosService {

    private final MoscatiArticulosRepository moscatiArticulosRepository;
    private final MoscatiArticulosMapper moscatiArticulosMapper;
    private final FotoPersonaService fotoPersonaService;
    private final FotoPersonaMapper fotoPersonaMapper;

    public MoscatiArticulosService(
        MoscatiArticulosRepository moscatiArticulosRepository,
        MoscatiArticulosMapper moscatiArticulosMapper,
        FotoPersonaService fotoPersonaService,
        FotoPersonaMapper fotoPersonaMapper
    ) {
        this.moscatiArticulosRepository = moscatiArticulosRepository;
        this.moscatiArticulosMapper = moscatiArticulosMapper;
        this.fotoPersonaService = fotoPersonaService;
        this.fotoPersonaMapper = fotoPersonaMapper;
    }

    @Transactional
    public MoscatiArticulosDTO save(MoscatiArticulosDTO moscatiArticulosDTO) {
        FotoPersonaDTO fotoPublicidad =
            this.fotoPersonaMapper.toDto(this.fotoPersonaService.findOne(moscatiArticulosDTO.getFoto().getId()));
        moscatiArticulosDTO.setFoto(fotoPublicidad);
        MoscatiArticulos moscatiArticulos = this.moscatiArticulosRepository.save(this.moscatiArticulosMapper.toEntity(moscatiArticulosDTO));
        return this.moscatiArticulosMapper.toDto(moscatiArticulos);
    }

    @Transactional(readOnly = true)
    public Page<MoscatiArticulosDTO> getAll(MoscatiArticulosCriteria criteria, Pageable pageable) {
        return this.moscatiArticulosRepository.findAll(criteria.buildSpecification(), pageable).map(moscatiArticulosMapper::toDto);
    }

    @Transactional(readOnly = true)
    public MoscatiArticulosDTO findArticuloById(Integer id) {
        return this.moscatiArticulosMapper.toDto(this.moscatiArticulosRepository.getOne(id));
    }
}
