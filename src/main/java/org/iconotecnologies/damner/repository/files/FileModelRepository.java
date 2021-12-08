package org.iconotecnologies.damner.repository.files;

import java.util.Optional;
import org.iconotecnologies.damner.domain.files.FileModel;
import org.iconotecnologies.damner.service.dto.files.LightFileDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface FileModelRepository<CLASS extends FileModel> extends JpaRepository<CLASS, String> {
    Optional<LightFileDTO> findProjectedById(String id);
}
