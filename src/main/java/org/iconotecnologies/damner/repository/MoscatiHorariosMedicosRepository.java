package org.iconotecnologies.damner.repository;

import java.util.List;
import org.iconotecnologies.damner.domain.MoscatiHorariosMedicos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface MoscatiHorariosMedicosRepository
    extends JpaRepository<MoscatiHorariosMedicos, Integer>, JpaSpecificationExecutor<MoscatiHorariosMedicos> {
    List<MoscatiHorariosMedicos> findAllByUser_IdOrderByDiaAsc(Long id);
}
