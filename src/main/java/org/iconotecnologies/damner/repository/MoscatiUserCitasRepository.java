package org.iconotecnologies.damner.repository;

import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import org.iconotecnologies.damner.domain.MoscatiUserCitas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MoscatiUserCitasRepository extends JpaRepository<MoscatiUserCitas, Integer>, JpaSpecificationExecutor<MoscatiUserCitas> {
    MoscatiUserCitas findFirstById(Integer id);
    Optional<MoscatiUserCitas> findFirstByFechaHoraSolicitudEqualsOrFechaHoraCitaEqualsAndDoctor_Id(
        ZonedDateTime fechaSolicitud,
        ZonedDateTime fechaCita,
        Long doctorId
    );
    List<MoscatiUserCitas> findAllByDoctor_IdAndFechaHoraSolicitudBetween(
        Long doctorId,
        ZonedDateTime fechaSolicitud,
        ZonedDateTime fechaHoraEnd
    );
    List<MoscatiUserCitas> findAllByDoctor_IdAndFechaHoraFinBetween(
        Long doctorId,
        ZonedDateTime fechaSolicitud,
        ZonedDateTime fechaHoraEnd
    );
}
