package org.iconotecnologies.damner.web.rest;

import io.micrometer.core.annotation.Timed;
import java.util.List;
import org.iconotecnologies.damner.service.MoscatiPromocionesService;
import org.iconotecnologies.damner.service.criteria.MoscatiPromocionesCriteria;
import org.iconotecnologies.damner.service.dto.MoscatiPromocionesDTO;
import org.iconotecnologies.damner.web.rest.util.PaginationUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MoscatiPromocionesResource {

    private final MoscatiPromocionesService service;

    public MoscatiPromocionesResource(MoscatiPromocionesService service) {
        this.service = service;
    }

    @GetMapping("/promociones")
    @Timed
    public ResponseEntity<List<MoscatiPromocionesDTO>> getAll(MoscatiPromocionesCriteria criteria, Pageable pageable) {
        Page<MoscatiPromocionesDTO> moscatiPromocionesDto = this.service.getAll(criteria, pageable);
        return ResponseEntity
            .ok()
            .headers(PaginationUtil.generatePaginationHttpHeaders(moscatiPromocionesDto, "/api/promociones"))
            .body(moscatiPromocionesDto.getContent());
    }
}
