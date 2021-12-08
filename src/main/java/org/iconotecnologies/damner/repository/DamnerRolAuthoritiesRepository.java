package org.iconotecnologies.damner.repository;

import java.util.List;
import org.iconotecnologies.damner.domain.DamnerRolAuthorities;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DamnerRolAuthoritiesRepository extends JpaRepository<DamnerRolAuthorities, Integer> {
    List<DamnerRolAuthorities> findAllByDamnerRol_Id(Integer id);
}
