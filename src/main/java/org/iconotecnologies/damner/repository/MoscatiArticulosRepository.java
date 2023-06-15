package org.iconotecnologies.damner.repository;

import org.iconotecnologies.damner.domain.MoscatiArticulos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface MoscatiArticulosRepository extends JpaRepository<MoscatiArticulos, Integer>, JpaSpecificationExecutor<MoscatiArticulos> {}
