package org.iconotecnologies.damner.service.files;

import java.io.IOException;
import java.lang.reflect.ParameterizedType;
import java.util.Optional;
import org.iconotecnologies.damner.domain.files.FileModel;
import org.iconotecnologies.damner.repository.files.FileModelRepository;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

public class FileModelService<CLASS extends FileModel> {

    private final FileModelRepository<CLASS> repository;

    public FileModelService(FileModelRepository<CLASS> repository) {
        this.repository = repository;
    }

    @Transactional
    public CLASS save(CLASS entity) {
        CLASS archivo = repository.save(entity);
        return archivo;
    }

    @Transactional
    public FileModel save(MultipartFile file) throws IOException {
        CLASS result = this.getInstance();
        result.setNombre(file.getName());
        result.setArchivoContentType(file.getContentType());
        result.setArchivo(file.getBytes());
        result = this.repository.saveAndFlush(result);
        if (!result.getArchivoContentType().contains("image")) result.setArchivo(new byte[] {});
        return result;
    }

    @Transactional(readOnly = true)
    public CLASS findOne(String id) {
        return this.repository.findProjectedById(id)
            .map(
                file -> {
                    if (file.getArchivoContentType().contains("image")) return this.repository.findById(id).orElse(null);
                    CLASS result = this.getInstance();
                    result.setArchivoContentType(file.getArchivoContentType());
                    result.setNombre(file.getNombre());
                    result.setId(file.getId());
                    return result;
                }
            )
            .orElse(null);
    }

    @Transactional(readOnly = true)
    public Optional<CLASS> findOneFull(String id) {
        return this.repository.findById(id);
    }

    @Transactional
    public void delete(String id) {
        this.repository.deleteById(id);
    }

    private CLASS getInstance() {
        ParameterizedType type = (ParameterizedType) this.getClass().getGenericSuperclass();
        Class<CLASS> clazz = (Class<CLASS>) type.getActualTypeArguments()[0];
        try {
            return clazz.newInstance();
        } catch (InstantiationException | IllegalAccessException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
}
