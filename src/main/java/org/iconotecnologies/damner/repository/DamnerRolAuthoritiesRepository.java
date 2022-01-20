package org.iconotecnologies.damner.repository;

import java.util.List;
import org.iconotecnologies.damner.domain.MoscatiRolAuthorities;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DamnerRolAuthoritiesRepository extends JpaRepository<MoscatiRolAuthorities, Integer> {
    List<MoscatiRolAuthorities> findAllByMoscatiRol_Id(Integer id);
}
