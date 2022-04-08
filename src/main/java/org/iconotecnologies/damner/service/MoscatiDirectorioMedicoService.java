package org.iconotecnologies.damner.service;

import java.util.List;
import org.iconotecnologies.damner.domain.MoscatiDirectorioMedico;
import org.iconotecnologies.damner.repository.MoscatiDirectorioMedicoRepository;
import org.iconotecnologies.damner.service.criteria.MoscatiDirectorioMedicoCriteria;
import org.iconotecnologies.damner.service.dto.MoscatiDirectorioMedicoDTO;
import org.iconotecnologies.damner.service.mapper.MoscatiDirectorioMedicoMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MoscatiDirectorioMedicoService {

    private final MoscatiDirectorioMedicoRepository repository;
    private final MoscatiDirectorioMedicoMapper mapper;

    public MoscatiDirectorioMedicoService(MoscatiDirectorioMedicoRepository repository, MoscatiDirectorioMedicoMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Transactional
    public MoscatiDirectorioMedicoDTO save(MoscatiDirectorioMedicoDTO moscatiDirectorioMedicoDTO) {
        MoscatiDirectorioMedico moscatiDirectorioMedico = this.repository.save(this.mapper.toEntity(moscatiDirectorioMedicoDTO));
        return this.mapper.toDto(moscatiDirectorioMedico);
    }

    @Transactional(readOnly = true)
    public List<MoscatiDirectorioMedicoDTO> findAllByEspecialidad(Integer id) {
        List<MoscatiDirectorioMedico> moscatiDirectorioMedico = this.repository.findAllByEspecialidad_Id(id);
        return this.mapper.toDto(moscatiDirectorioMedico);
    }

    @Transactional(readOnly = true)
    public List<MoscatiDirectorioMedicoDTO> findAllPost() {
        List<MoscatiDirectorioMedico> moscatiDirectorioMedico = this.repository.findAll();
        return this.mapper.toDto(moscatiDirectorioMedico);
    }

    @Transactional(readOnly = true)
    public Page<MoscatiDirectorioMedicoDTO> getAll(MoscatiDirectorioMedicoCriteria criteria, Pageable pageable) {
        return this.repository.findAll(criteria.buildSpecification(), pageable).map(mapper::toDto);
    }
}
