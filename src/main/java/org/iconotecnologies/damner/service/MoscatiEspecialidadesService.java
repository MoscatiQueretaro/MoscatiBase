package org.iconotecnologies.damner.service;

import java.util.List;
import org.iconotecnologies.damner.domain.catalogos.MoscatiEspecialidades;
import org.iconotecnologies.damner.repository.catalogos.MoscatiEspecialidadesRepository;
import org.iconotecnologies.damner.service.dto.catalogos.MoscatiEspecialidadesDTO;
import org.iconotecnologies.damner.service.mapper.catalogos.MoscatiEspecialidadesMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MoscatiEspecialidadesService {

    private final MoscatiEspecialidadesRepository repository;
    private final MoscatiEspecialidadesMapper mapper;

    public MoscatiEspecialidadesService(MoscatiEspecialidadesRepository repository, MoscatiEspecialidadesMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Transactional
    public MoscatiEspecialidadesDTO save(MoscatiEspecialidadesDTO moscatiEspecialidadesDTO) {
        MoscatiEspecialidades moscatiEspecialidades = this.repository.save(this.mapper.toEntity(moscatiEspecialidadesDTO));
        return this.mapper.toDto(moscatiEspecialidades);
    }

    @Transactional(readOnly = true)
    public MoscatiEspecialidadesDTO findOneById(Integer id) {
        MoscatiEspecialidades moscatiEspecialidades = this.repository.findFirstById(id);
        return this.mapper.toDto(moscatiEspecialidades);
    }

    @Transactional(readOnly = true)
    public List<MoscatiEspecialidadesDTO> findAll() {
        List<MoscatiEspecialidades> moscatiEspecialidades = this.repository.findAll();
        return this.mapper.toDto(moscatiEspecialidades);
    }
    //    @Transactional(readOnly = true)
    //    public Page<MoscatiEspecialidadesDTO> getAll(MoscatiEspecialidadesCriteria criteria, Pageable pageable) {
    //        return this.repository.findAll(criteria.buildSpecification(), pageable).map(mapper::toDto);
    //    }
}
