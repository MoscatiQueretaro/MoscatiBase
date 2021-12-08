package org.iconotecnologies.damner.service.files;

import org.iconotecnologies.damner.domain.files.FotoPersona;
import org.iconotecnologies.damner.repository.files.FotoPersonaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class FotoPersonaService extends FileModelService<FotoPersona> {

    private final FotoPersonaRepository repository;

    public FotoPersonaService(FotoPersonaRepository repository) {
        super(repository);
        this.repository = repository;
    }
}
