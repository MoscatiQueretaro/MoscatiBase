package org.iconotecnologies.damner.web.rest.files;

import io.micrometer.core.annotation.Timed;
import java.io.IOException;
import org.iconotecnologies.damner.domain.files.FileModel;
import org.iconotecnologies.damner.domain.files.FotoPersona;
import org.iconotecnologies.damner.service.files.FotoPersonaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tech.jhipster.web.util.ResponseUtil;

@RestController
@RequestMapping("/api/foto-persona")
public class FotoPersonaResource extends FileModelResource<FotoPersona> {

    FotoPersonaService service;

    FotoPersonaResource(FotoPersonaService service) {
        super(service);
        this.service = service;
    }

    @PutMapping("")
    @Timed
    public ResponseEntity<FotoPersona> update(@RequestBody FotoPersona doc) {
        return super.update(doc);
    }

    @PostMapping("")
    @Timed
    public ResponseEntity<FotoPersona> create(@RequestBody FotoPersona doc) {
        return super.create(doc);
    }

    @GetMapping("/{id}")
    @Timed
    public ResponseEntity<FotoPersona> getOne(@PathVariable String id) {
        return super.getOne(id);
    }

    @GetMapping("/full/{id}")
    @Timed
    public ResponseEntity<FotoPersona> getOneFull(@PathVariable String id) {
        return ResponseUtil.wrapOrNotFound(this.service.findOneFull(id));
    }

    @PostMapping("/multipart")
    @Timed
    public ResponseEntity<FileModel> saveMultipart(@RequestBody MultipartFile file) throws IOException {
        return super.saveMultipart(file);
    }

    @DeleteMapping("/{id}")
    @Timed
    public ResponseEntity delete(@PathVariable String id) {
        return super.delete(id);
    }
}
