package org.iconotecnologies.damner.service;

import java.util.List;
import org.iconotecnologies.damner.domain.MoscatiPromociones;
import org.iconotecnologies.damner.repository.MoscatiPromocionesRepository;
import org.iconotecnologies.damner.service.criteria.MoscatiPromocionesCriteria;
import org.iconotecnologies.damner.service.dto.MoscatiPromocionesDTO;
import org.iconotecnologies.damner.service.mapper.MoscatiPromocionesMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MoscatiPromocionesService {

    private final MoscatiPromocionesRepository repository;
    private final MoscatiPromocionesMapper mapper;

    public MoscatiPromocionesService(MoscatiPromocionesRepository repository, MoscatiPromocionesMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Transactional
    public MoscatiPromocionesDTO save(MoscatiPromocionesDTO moscatiPromocionesDTO) {
        MoscatiPromociones moscatiPromociones = this.repository.save(this.mapper.toEntity(moscatiPromocionesDTO));
        return this.mapper.toDto(moscatiPromociones);
    }

    @Transactional(readOnly = true)
    public List<MoscatiPromocionesDTO> findAllPostByUser(Integer id) {
        List<MoscatiPromociones> moscatiPromociones = this.repository.findAllByAutorOrderByVigenciaAsc(id);
        return this.mapper.toDto(moscatiPromociones);
    }

    @Transactional(readOnly = true)
    public List<MoscatiPromocionesDTO> findAllPost() {
        List<MoscatiPromociones> moscatiPromociones = this.repository.findAll();
        return this.mapper.toDto(moscatiPromociones);
    }

    @Transactional(readOnly = true)
    public Page<MoscatiPromocionesDTO> getAll(MoscatiPromocionesCriteria criteria, Pageable pageable) {
        return this.repository.findAll(criteria.buildSpecification(), pageable).map(mapper::toDto);
    }
}
