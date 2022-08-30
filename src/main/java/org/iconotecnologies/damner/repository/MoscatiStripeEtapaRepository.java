package org.iconotecnologies.damner.repository;

import org.iconotecnologies.damner.domain.MoscatiStripeEtapa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface MoscatiStripeEtapaRepository
    extends JpaRepository<MoscatiStripeEtapa, Integer>, JpaSpecificationExecutor<MoscatiStripeEtapa> {
    MoscatiStripeEtapa findFirstByDescripcion(String descripcion);
}
