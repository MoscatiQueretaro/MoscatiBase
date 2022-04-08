package org.iconotecnologies.damner.service;

import java.util.List;
import org.iconotecnologies.damner.domain.MoscatiHorariosMedicos;
import org.iconotecnologies.damner.repository.MoscatiHorariosMedicosRepository;
import org.iconotecnologies.damner.service.dto.MoscatiHorariosMedicosDTO;
import org.iconotecnologies.damner.service.mapper.MoscatiHorariosMedicosMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MoscatiHorariosMedicosService {

    private final MoscatiHorariosMedicosRepository repository;
    private final MoscatiHorariosMedicosMapper mapper;

    public MoscatiHorariosMedicosService(MoscatiHorariosMedicosRepository repository, MoscatiHorariosMedicosMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Transactional
    public MoscatiHorariosMedicosDTO save(MoscatiHorariosMedicosDTO moscatiHorariosMedicosDTO) {
        MoscatiHorariosMedicos moscatiHorariosMedicos = this.repository.save(this.mapper.toEntity(moscatiHorariosMedicosDTO));
        return this.mapper.toDto(moscatiHorariosMedicos);
    }

    public List<MoscatiHorariosMedicosDTO> saveAll(List<MoscatiHorariosMedicosDTO> horariosDto) {
        List<MoscatiHorariosMedicos> horarios = this.repository.saveAll(this.mapper.toEntity(horariosDto));
        return this.mapper.toDto(horarios);
    }

    @Transactional(readOnly = true)
    public List<MoscatiHorariosMedicosDTO> findAllByUserId(Long id) {
        List<MoscatiHorariosMedicos> moscatiHorariosMedicos = this.repository.findAllByUser_IdOrderByDiaAsc(id);
        return this.mapper.toDto(moscatiHorariosMedicos);
    }

    @Transactional(readOnly = true)
    public List<MoscatiHorariosMedicosDTO> findAllHorarios() {
        List<MoscatiHorariosMedicos> moscatiHorariosMedicos = this.repository.findAll();
        return this.mapper.toDto(moscatiHorariosMedicos);
    }
    //    @Transactional(readOnly = true)
    //    public Page<MoscatiDirectorioMedicoDTO> getAll(MoscatiDirectorioMedicoCriteria criteria, Pageable pageable) {
    //        return this.repository.findAll(criteria.buildSpecification(), pageable).map(mapper::toDto);
    //    }

}
