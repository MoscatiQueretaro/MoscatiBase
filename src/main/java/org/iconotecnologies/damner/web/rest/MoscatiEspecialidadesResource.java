package org.iconotecnologies.damner.web.rest;

import io.micrometer.core.annotation.Timed;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import org.iconotecnologies.damner.domain.catalogos.MoscatiEspecialidades;
import org.iconotecnologies.damner.service.MoscatiEspecialidadesService;
import org.iconotecnologies.damner.service.dto.catalogos.MoscatiEspecialidadesDTO;
import org.iconotecnologies.damner.web.rest.errors.BadRequestAlertException;
import org.iconotecnologies.damner.web.rest.util.HeaderUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.ResponseUtil;

@RestController
@RequestMapping("/api/especialidades")
public class MoscatiEspecialidadesResource {

    private final MoscatiEspecialidadesService service;

    public MoscatiEspecialidadesResource(MoscatiEspecialidadesService service) {
        this.service = service;
    }

    @PostMapping("")
    @Timed
    public ResponseEntity<MoscatiEspecialidadesDTO> create(@RequestBody MoscatiEspecialidadesDTO moscatiEspecialidadesDTO)
        throws URISyntaxException {
        if (moscatiEspecialidadesDTO.getId() != null) {
            throw new BadRequestAlertException(
                "Surgió un error al momento de guardar la especialidad",
                MoscatiEspecialidades.ENTITY_NAME,
                "NO DEBE EXISTIE EL ID"
            );
        }
        MoscatiEspecialidadesDTO dto = this.service.save(moscatiEspecialidadesDTO);
        return ResponseEntity
            .created(new URI("/api/especialidades/" + dto.getId().toString()))
            .headers(HeaderUtil.createEntityCreationAlert(MoscatiEspecialidades.ENTITY_NAME, dto.getId().toString()))
            .body(dto);
    }

    @GetMapping("/{id}")
    @Timed
    public ResponseEntity<MoscatiEspecialidadesDTO> getOne(@PathVariable Integer id) {
        MoscatiEspecialidadesDTO dto = this.service.findOneById(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(dto));
    }

    @GetMapping("")
    @Timed
    public ResponseEntity<List<MoscatiEspecialidadesDTO>> getAll() {
        List<MoscatiEspecialidadesDTO> especialidades = this.service.findAll();
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(especialidades));
    }
}
