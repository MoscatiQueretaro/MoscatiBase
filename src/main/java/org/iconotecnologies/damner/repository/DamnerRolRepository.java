package org.iconotecnologies.damner.repository;

import org.iconotecnologies.damner.domain.DamnerRol;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DamnerRolRepository extends JpaRepository<DamnerRol, Integer> {
    DamnerRol findFirstByNombre(String nombre);
}
