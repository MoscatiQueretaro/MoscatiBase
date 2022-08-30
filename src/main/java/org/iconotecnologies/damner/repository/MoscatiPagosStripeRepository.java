package org.iconotecnologies.damner.repository;

import org.iconotecnologies.damner.domain.MoscatiPagosStripe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface MoscatiPagosStripeRepository
    extends JpaRepository<MoscatiPagosStripe, Integer>, JpaSpecificationExecutor<MoscatiPagosStripe> {
    MoscatiPagosStripe findFirstByStripeKey(String stripeKey);
}
