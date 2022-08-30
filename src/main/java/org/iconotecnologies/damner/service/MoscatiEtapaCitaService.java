package org.iconotecnologies.damner.service;

import java.util.List;
import org.iconotecnologies.damner.domain.catalogos.MoscatiEtapaCita;
import org.iconotecnologies.damner.repository.catalogos.MoscatiEtapaCitaRepository;
import org.iconotecnologies.damner.service.criteria.catalogos.MoscatiEtapaCitaCriteria;
import org.iconotecnologies.damner.service.dto.catalogos.MoscatiEtapaCitaDTO;
import org.iconotecnologies.damner.service.mapper.catalogos.MoscatiEtapaCitaMapper;
import org.iconotecnologies.damner.web.rest.errors.BadRequestAlertException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MoscatiEtapaCitaService {

    private final MoscatiEtapaCitaRepository repository;
    private final MoscatiEtapaCitaMapper mapper;

    public MoscatiEtapaCitaService(MoscatiEtapaCitaRepository repository, MoscatiEtapaCitaMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Transactional(readOnly = true)
    public Page<MoscatiEtapaCitaDTO> findAll(Pageable pageable, MoscatiEtapaCitaCriteria criteria) {
        Page<MoscatiEtapaCitaDTO> moscatiEtapaCitas = this.repository.findAll(criteria.buildSpecification(), pageable).map(mapper::toDto);
        return moscatiEtapaCitas;
    }

    @Transactional(readOnly = true)
    public List<MoscatiEtapaCitaDTO> findActive() {
        List<MoscatiEtapaCitaDTO> moscatiEtapaCitaDTOList = this.mapper.toDto(this.repository.findAllByEstatus("A"));
        return moscatiEtapaCitaDTOList;
    }

    @Transactional(readOnly = true)
    public MoscatiEtapaCitaDTO findOne(Integer id) {
        MoscatiEtapaCitaDTO moscatiEtapaCitaDTO =
            this.mapper.toDto(
                    this.repository.findById(id)
                        .orElseThrow(
                            () ->
                                new BadRequestAlertException(
                                    "La entidad con id:" + id + " no existe",
                                    MoscatiEtapaCita.ENTITY_NAME,
                                    "notFound"
                                )
                        )
                );
        return moscatiEtapaCitaDTO;
    }

    @Transactional
    public MoscatiEtapaCitaDTO create(MoscatiEtapaCitaDTO moscatiEtapaCita) {
        MoscatiEtapaCita exist = this.repository.findFirstByDescripcion(moscatiEtapaCita.getDescripcion());
        if (exist != null) throw new BadRequestAlertException("La entidad ya existe", MoscatiEtapaCita.ENTITY_NAME, "exist");
        MoscatiEtapaCitaDTO newEtapaCita = this.mapper.toDto(this.repository.save(this.mapper.toEntity(moscatiEtapaCita)));
        return newEtapaCita;
    }

    @Transactional
    public MoscatiEtapaCitaDTO update(MoscatiEtapaCitaDTO entity) {
        MoscatiEtapaCitaDTO moscatiEtapaCitaDTO = this.mapper.toDto(this.repository.save(this.mapper.toEntity(entity)));
        return moscatiEtapaCitaDTO;
    }

    @Transactional
    public MoscatiEtapaCitaDTO delete(Integer id) {
        MoscatiEtapaCita moscatiEtapaCita =
            this.repository.findById(id)
                .orElseThrow(() -> new BadRequestAlertException("La entidad no existe", MoscatiEtapaCita.ENTITY_NAME, "notFound"));
        String estatus = moscatiEtapaCita.getEstatus().equals("A") ? "I" : "A";
        moscatiEtapaCita.setEstatus(estatus);
        MoscatiEtapaCitaDTO moscatiEtapaCitaDTO = this.mapper.toDto(this.repository.save(moscatiEtapaCita));
        return moscatiEtapaCitaDTO;
    }
}
