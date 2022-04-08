package org.iconotecnologies.damner.web.rest;

import io.micrometer.core.annotation.Timed;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import org.iconotecnologies.damner.domain.MoscatiDirectorioMedico;
import org.iconotecnologies.damner.service.MoscatiDirectorioMedicoService;
import org.iconotecnologies.damner.service.criteria.MoscatiDirectorioMedicoCriteria;
import org.iconotecnologies.damner.service.dto.MoscatiDirectorioMedicoDTO;
import org.iconotecnologies.damner.web.rest.errors.BadRequestAlertException;
import org.iconotecnologies.damner.web.rest.util.HeaderUtil;
import org.iconotecnologies.damner.web.rest.util.PaginationUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.ResponseUtil;

@RestController
@RequestMapping("/api/directoriomedico")
public class MoscatiDirectorioMedicoResource {

    private final MoscatiDirectorioMedicoService service;

    public MoscatiDirectorioMedicoResource(MoscatiDirectorioMedicoService service) {
        this.service = service;
    }

    @PostMapping("")
    @Timed
    public ResponseEntity<MoscatiDirectorioMedicoDTO> create(@RequestBody MoscatiDirectorioMedicoDTO moscatiDirectorioMedicoDTO)
        throws URISyntaxException {
        if (moscatiDirectorioMedicoDTO.getId() != null) {
            throw new BadRequestAlertException(
                "Surgió un error al momento de guardar el directorio Medico",
                MoscatiDirectorioMedico.ENTITY_NAME,
                "NO DEBE EXISTIE EL ID"
            );
        }
        MoscatiDirectorioMedicoDTO dto = this.service.save(moscatiDirectorioMedicoDTO);
        return ResponseEntity
            .created(new URI("/api/directoriomedico/" + dto.getId().toString()))
            .headers(HeaderUtil.createEntityCreationAlert(MoscatiDirectorioMedico.ENTITY_NAME, dto.getId().toString()))
            .body(dto);
    }

    @GetMapping("/{especialidadid}")
    @Timed
    public ResponseEntity<List<MoscatiDirectorioMedicoDTO>> findAllByEspecialidad(@PathVariable Integer especialidadid) {
        List<MoscatiDirectorioMedicoDTO> dto = this.service.findAllByEspecialidad(especialidadid);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(dto));
    }

    @GetMapping("")
    @Timed
    public ResponseEntity<List<MoscatiDirectorioMedicoDTO>> getAll(MoscatiDirectorioMedicoCriteria criteria, Pageable pageable) {
        Page<MoscatiDirectorioMedicoDTO> moscatiDirectorio = this.service.getAll(criteria, pageable);
        return ResponseEntity
            .ok()
            .headers(PaginationUtil.generatePaginationHttpHeaders(moscatiDirectorio, "/api/directoriomedico"))
            .body(moscatiDirectorio.getContent());
    }
}
