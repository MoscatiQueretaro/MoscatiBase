package org.iconotecnologies.damner.web.rest.files;

import java.io.IOException;
import org.iconotecnologies.damner.domain.files.FileModel;
import org.iconotecnologies.damner.service.files.FileModelService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public class FileModelResource<CLASS extends FileModel> {

    private final FileModelService<CLASS> service;

    public FileModelResource(FileModelService<CLASS> service) {
        this.service = service;
    }

    public ResponseEntity<CLASS> update(CLASS doc) {
        return ResponseEntity.ok(this.service.save(doc));
    }

    public ResponseEntity<CLASS> create(CLASS doc) {
        return ResponseEntity.ok(this.service.save(doc));
    }

    public ResponseEntity<CLASS> getOne(String id) {
        return ResponseEntity.ok(this.service.findOne(id));
    }

    public ResponseEntity<FileModel> saveMultipart(MultipartFile file) throws IOException {
        return ResponseEntity.ok(this.service.save(file));
    }

    public ResponseEntity delete(String id) {
        this.service.delete(id);
        return ResponseEntity.ok().build();
    }
}
