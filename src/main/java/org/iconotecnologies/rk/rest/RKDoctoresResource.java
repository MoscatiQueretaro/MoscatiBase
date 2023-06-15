package org.iconotecnologies.rk.rest;

import io.micrometer.core.annotation.Timed;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import org.iconotecnologies.damner.web.rest.errors.BadRequestAlertException;
import org.iconotecnologies.damner.web.rest.util.HeaderUtil;
import org.iconotecnologies.rk.domain.RKDoctores;
import org.iconotecnologies.rk.service.RKDoctoresService;
import org.iconotecnologies.rk.service.dto.RKDoctoresDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.ResponseUtil;

@RestController
@RequestMapping("/api/rkdoctores")
public class RKDoctoresResource {

    private final RKDoctoresService service;

    public RKDoctoresResource(RKDoctoresService service) {
        this.service = service;
    }

    @PostMapping("")
    @Timed
    public ResponseEntity<RKDoctoresDTO> create(@RequestBody RKDoctoresDTO rkDoctoresDTO) throws URISyntaxException {
        if (rkDoctoresDTO.getId() != null) {
            throw new BadRequestAlertException(
                "Surgió un error al momento de guardar RKDoctores",
                RKDoctores.ENTITY_NAME,
                "NO DEBE EXISTIE EL ID"
            );
        }
        RKDoctoresDTO dto = this.service.save(rkDoctoresDTO);
        return ResponseEntity
            .created(new URI("/api/rkdoctores/" + dto.getId().toString()))
            .headers(HeaderUtil.createEntityCreationAlert(RKDoctores.ENTITY_NAME, dto.getId().toString()))
            .body(dto);
    }

    @GetMapping("/{professionalLicence}")
    @Timed
    public ResponseEntity<RKDoctoresDTO> getOne(@PathVariable String professionalLicence) {
        RKDoctoresDTO dto = this.service.findOneByProfessionalLicence(professionalLicence);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(dto));
    }

    @GetMapping("")
    @Timed
    public ResponseEntity<List<RKDoctoresDTO>> getAll() {
        List<RKDoctoresDTO> doctores = this.service.findAll();
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(doctores));
    }
}
