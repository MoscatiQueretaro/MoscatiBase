package org.iconotecnologies.damner.repository;

import org.iconotecnologies.damner.domain.MoscatiUserRol;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DamnerUserRolRepository extends JpaRepository<MoscatiUserRol, Integer> {
    MoscatiUserRol findFirstByDamnerUserId(Long id);
}
