package org.iconotecnologies.damner.repository.files;

import java.util.List;
import org.iconotecnologies.damner.domain.files.PhotoUserAlbum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoUserAlbumRepository extends JpaRepository<PhotoUserAlbum, String>, JpaSpecificationExecutor<PhotoUserAlbum> {
    List<PhotoUserAlbum> findAllByAlbumTypeId(Integer albumTypeId);
    List<PhotoUserAlbum> findAllByEstatus(String estatus);
}
