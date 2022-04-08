package org.iconotecnologies.damner.repository;

import java.util.List;
import org.iconotecnologies.damner.domain.MoscatiDirectorioMedico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface MoscatiDirectorioMedicoRepository
    extends JpaRepository<MoscatiDirectorioMedico, Integer>, JpaSpecificationExecutor<MoscatiDirectorioMedico> {
    List<MoscatiDirectorioMedico> findAllByEspecialidad_Id(Integer id);
}
