package org.iconotecnologies.damner.repository;

import java.util.List;
import org.iconotecnologies.damner.domain.MoscatiPromociones;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface MoscatiPromocionesRepository
    extends JpaRepository<MoscatiPromociones, Integer>, JpaSpecificationExecutor<MoscatiPromociones> {
    List<MoscatiPromociones> findAllByAutorOrderByVigenciaAsc(Integer idAutor);
}
