package org.iconotecnologies.damner.web.rest;

import io.micrometer.core.annotation.Timed;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import org.iconotecnologies.damner.domain.MoscatiPromociones;
import org.iconotecnologies.damner.service.MoscatiPromocionesService;
import org.iconotecnologies.damner.service.criteria.MoscatiPromocionesCriteria;
import org.iconotecnologies.damner.service.dto.MoscatiPromocionesDTO;
import org.iconotecnologies.damner.web.rest.errors.BadRequestAlertException;
import org.iconotecnologies.damner.web.rest.util.HeaderUtil;
import org.iconotecnologies.damner.web.rest.util.PaginationUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.ResponseUtil;

@RestController
@RequestMapping("/api/promociones")
public class MoscatiPromocionesResource {

    private final MoscatiPromocionesService service;

    public MoscatiPromocionesResource(MoscatiPromocionesService service) {
        this.service = service;
    }

    @GetMapping("")
    @Timed
    public ResponseEntity<List<MoscatiPromocionesDTO>> getAll(MoscatiPromocionesCriteria criteria, Pageable pageable) {
        Page<MoscatiPromocionesDTO> moscatiPromocionesDto = this.service.getAll(criteria, pageable);
        return ResponseEntity
            .ok()
            .headers(PaginationUtil.generatePaginationHttpHeaders(moscatiPromocionesDto, "/api/promociones"))
            .body(moscatiPromocionesDto.getContent());
    }

    @GetMapping("/active")
    @Timed
    public ResponseEntity<List<MoscatiPromocionesDTO>> getAllActives() {
        List<MoscatiPromocionesDTO> moscatiPromocionesDto = this.service.findAllPost();
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(moscatiPromocionesDto));
    }

    @PostMapping("")
    @Timed
    public ResponseEntity<MoscatiPromocionesDTO> create(@RequestBody MoscatiPromocionesDTO damnerUserPostDTO) throws URISyntaxException {
        if (damnerUserPostDTO.getId() != null) {
            throw new BadRequestAlertException(
                "Surgió un error al momento de guardar la publicidad",
                MoscatiPromociones.ENTITY_NAME,
                "NO DEBE EXISTIE EL ID"
            );
        }
        MoscatiPromocionesDTO dto = this.service.save(damnerUserPostDTO);
        return ResponseEntity.ok(dto);
    }
}
