package org.iconotecnologies.damner.web.rest;

import io.micrometer.core.annotation.Timed;
import java.util.List;
import org.iconotecnologies.damner.service.MoscatiNotificationsService;
import org.iconotecnologies.damner.service.dto.MoscatiNotificationsDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MoscatiNotificationsResource {

    private final MoscatiNotificationsService service;

    public MoscatiNotificationsResource(MoscatiNotificationsService service) {
        this.service = service;
    }

    @PostMapping("/notifications")
    @Timed
    public ResponseEntity<MoscatiNotificationsDTO> save(MoscatiNotificationsDTO notificationsDTO) {
        MoscatiNotificationsDTO dto = this.service.save(notificationsDTO);
        return ResponseEntity.ok(dto);
    }
    //    @GetMapping("/notifications")
    //    @Timed
    //    public ResponseEntity<List<MoscatiPromocionesDTO>> getAll(MoscatiPromocionesCriteria criteria, Pageable pageable) {
    //        Page<MoscatiPromocionesDTO> moscatiPromocionesDto = this.service.getAll(criteria, pageable);
    //        return ResponseEntity
    //            .ok()
    //            .headers(PaginationUtil.generatePaginationHttpHeaders(moscatiPromocionesDto, "/api/promociones"))
    //            .body(moscatiPromocionesDto.getContent());
    //    }

}
