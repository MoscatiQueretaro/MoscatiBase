package org.iconotecnologies.damner.repository;

import org.iconotecnologies.damner.domain.DamnerUserRol;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DamnerUserRolRepository extends JpaRepository<DamnerUserRol, Integer> {
    DamnerUserRol findFirstByDamnerUserId(Long id);
}
