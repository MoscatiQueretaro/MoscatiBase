package org.iconotecnologies.damner.repository;

import java.util.List;
import org.iconotecnologies.damner.domain.MoscatiPromociones;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MoscatiPromocionesRepository
    extends JpaRepository<MoscatiPromociones, Integer>, JpaSpecificationExecutor<MoscatiPromociones> {
    //    List<MoscatiPromociones> findAllByAutorOrderByVigenciaAsc(Integer idAutor);

    @Query("select mp.autor.name, mp.descripcion, mp.nombre from MoscatiPromociones mp")
    List<MoscatiPromociones> selectPromocionesFromAutoComplete();
}
