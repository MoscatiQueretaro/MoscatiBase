package org.iconotecnologies.damner.service;

import org.iconotecnologies.damner.domain.MoscatiPagosStripe;
import org.iconotecnologies.damner.repository.MoscatiPagosStripeRepository;
import org.iconotecnologies.damner.service.dto.MoscatiPagosStripeDTO;
import org.iconotecnologies.damner.service.dto.MoscatiUserDTO;
import org.iconotecnologies.damner.service.mapper.MoscatiPagosStripeMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MoscatiPagosStripeService {

    private final MoscatiPagosStripeRepository repository;
    private final MoscatiPagosStripeMapper mapper;

    public MoscatiPagosStripeService(MoscatiPagosStripeRepository repository, MoscatiPagosStripeMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Transactional
    public MoscatiPagosStripeDTO save(MoscatiPagosStripeDTO moscatiPagosDTO) {
        MoscatiPagosStripe moscatiPagos = this.repository.save(this.mapper.toEntity(moscatiPagosDTO));
        return this.mapper.toDto(moscatiPagos);
    }

    @Transactional
    public MoscatiPagosStripeDTO getPagoByStripeKey(String stripeKey) {
        MoscatiPagosStripeDTO dto = mapper.toDto(repository.findFirstByStripeKey(stripeKey));
        return dto;
    }
}
