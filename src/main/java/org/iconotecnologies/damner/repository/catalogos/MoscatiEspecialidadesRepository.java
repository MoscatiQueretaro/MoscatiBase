package org.iconotecnologies.damner.repository.catalogos;

import org.iconotecnologies.damner.domain.catalogos.MoscatiEspecialidades;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface MoscatiEspecialidadesRepository
    extends JpaRepository<MoscatiEspecialidades, Integer>, JpaSpecificationExecutor<MoscatiEspecialidades> {
    MoscatiEspecialidades findFirstById(Integer id);
}
