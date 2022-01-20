package org.iconotecnologies.damner.repository;

import org.iconotecnologies.damner.domain.MoscatiRol;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DamnerRolRepository extends JpaRepository<MoscatiRol, Integer> {
    MoscatiRol findFirstByNombre(String nombre);
}
