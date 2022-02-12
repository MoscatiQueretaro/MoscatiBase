package org.iconotecnologies.damner.repository.files;

import java.util.Optional;
import org.iconotecnologies.damner.domain.files.FotoPersona;
import org.iconotecnologies.damner.service.dto.files.LightFileDTO;
import org.springframework.stereotype.Repository;

@Repository
public interface FotoPersonaRepository extends FileModelRepository<FotoPersona> {
    Optional<LightFileDTO> findProjectedById(String id);
}
