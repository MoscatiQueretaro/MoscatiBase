package org.iconotecnologies.damner.service;

import org.iconotecnologies.damner.domain.MoscatiStripeEtapa;
import org.iconotecnologies.damner.repository.MoscatiStripeEtapaRepository;
import org.iconotecnologies.damner.service.dto.MoscatiStripeEtapaDTO;
import org.iconotecnologies.damner.service.mapper.MoscatiStripeEtapaMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MoscatiStripeEtapaService {

    private final MoscatiStripeEtapaRepository repository;
    private final MoscatiStripeEtapaMapper mapper;

    public MoscatiStripeEtapaService(MoscatiStripeEtapaRepository repository, MoscatiStripeEtapaMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Transactional(readOnly = true)
    public MoscatiStripeEtapaDTO findOneEtapaByDescripcion(String descripcion) {
        MoscatiStripeEtapa moscatiEspecialidades = this.repository.findFirstByDescripcion(descripcion);
        return this.mapper.toDto(moscatiEspecialidades);
    }
}
