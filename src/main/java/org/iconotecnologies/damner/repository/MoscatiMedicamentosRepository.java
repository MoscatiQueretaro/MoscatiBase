package org.iconotecnologies.damner.repository;

import org.iconotecnologies.damner.domain.MoscatiMedicamentos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MoscatiMedicamentosRepository extends JpaRepository<MoscatiMedicamentos, Integer> {}
