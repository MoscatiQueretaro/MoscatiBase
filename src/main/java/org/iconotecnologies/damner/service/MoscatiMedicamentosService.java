package org.iconotecnologies.damner.service;

import java.util.List;
import org.iconotecnologies.damner.domain.MoscatiMedicamentos;
import org.iconotecnologies.damner.repository.MoscatiMedicamentosRepository;
import org.iconotecnologies.damner.service.dto.MoscatiMedicamentosDTO;
import org.iconotecnologies.damner.service.mapper.MoscatiMedicamentosMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MoscatiMedicamentosService {

    private final MoscatiMedicamentosMapper moscatiMedicamentosMapper;
    private final MoscatiMedicamentosRepository moscatiMedicamentosRepository;

    public MoscatiMedicamentosService(
        MoscatiMedicamentosMapper moscatiMedicamentosMapper,
        MoscatiMedicamentosRepository moscatiMedicamentosRepository
    ) {
        this.moscatiMedicamentosMapper = moscatiMedicamentosMapper;
        this.moscatiMedicamentosRepository = moscatiMedicamentosRepository;
    }

    @Transactional
    public MoscatiMedicamentosDTO save(MoscatiMedicamentosDTO newMedicamento) {
        MoscatiMedicamentos medicamentos = this.moscatiMedicamentosRepository.save(this.moscatiMedicamentosMapper.toEntity(newMedicamento));
        return this.moscatiMedicamentosMapper.toDto(medicamentos);
    }

    @Transactional
    public List<MoscatiMedicamentosDTO> getAll() {
        List<MoscatiMedicamentos> medicamentosList = moscatiMedicamentosRepository.findAll();
        return moscatiMedicamentosMapper.toDto(medicamentosList);
    }
}
