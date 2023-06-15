package org.iconotecnologies.damner.web.rest;

import io.micrometer.core.annotation.Timed;
import java.net.URISyntaxException;
import java.util.List;
import org.iconotecnologies.damner.domain.MoscatiPromociones;
import org.iconotecnologies.damner.service.MoscatiArticulosService;
import org.iconotecnologies.damner.service.criteria.MoscatiArticulosCriteria;
import org.iconotecnologies.damner.service.dto.MoscatiArticulosDTO;
import org.iconotecnologies.damner.web.rest.errors.BadRequestAlertException;
import org.iconotecnologies.damner.web.rest.util.PaginationUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/articulos")
public class MoscatiArticulosResource {

    private final MoscatiArticulosService service;

    public MoscatiArticulosResource(MoscatiArticulosService service) {
        this.service = service;
    }

    @GetMapping("")
    @Timed
    public ResponseEntity<List<MoscatiArticulosDTO>> getAll(MoscatiArticulosCriteria criteria, Pageable pageable) {
        Page<MoscatiArticulosDTO> moscatiArticulosDTOS = this.service.getAll(criteria, pageable);
        return ResponseEntity
            .ok()
            .headers(PaginationUtil.generatePaginationHttpHeaders(moscatiArticulosDTOS, "/api/promociones"))
            .body(moscatiArticulosDTOS.getContent());
    }

    @PostMapping("")
    @Timed
    public ResponseEntity<MoscatiArticulosDTO> create(@RequestBody MoscatiArticulosDTO moscatiArticulosDTO) throws URISyntaxException {
        if (moscatiArticulosDTO.getId() != null) {
            throw new BadRequestAlertException(
                "Surgió un error al momento de guardar la publicidad",
                MoscatiPromociones.ENTITY_NAME,
                "NO DEBE EXISTIE EL ID"
            );
        }
        MoscatiArticulosDTO dto = this.service.save(moscatiArticulosDTO);
        return ResponseEntity.ok(dto);
    }
}
