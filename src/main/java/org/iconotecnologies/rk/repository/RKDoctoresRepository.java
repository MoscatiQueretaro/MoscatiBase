package org.iconotecnologies.rk.repository;

import org.iconotecnologies.rk.domain.RKDoctores;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface RKDoctoresRepository extends JpaRepository<RKDoctores, Integer>, JpaSpecificationExecutor<RKDoctores> {
    RKDoctores findFirstByProfessionalLicence(String cedula);
}
