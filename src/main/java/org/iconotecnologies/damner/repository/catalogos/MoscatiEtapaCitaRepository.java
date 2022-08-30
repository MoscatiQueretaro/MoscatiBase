package org.iconotecnologies.damner.repository.catalogos;

import java.util.List;
import org.iconotecnologies.damner.domain.catalogos.MoscatiEtapaCita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface MoscatiEtapaCitaRepository extends JpaRepository<MoscatiEtapaCita, Integer>, JpaSpecificationExecutor<MoscatiEtapaCita> {
    List<MoscatiEtapaCita> findAllByEstatus(String estatus);
    MoscatiEtapaCita findFirstByDescripcion(String descripcion);
}
