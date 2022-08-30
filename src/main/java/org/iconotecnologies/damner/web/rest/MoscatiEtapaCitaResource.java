package org.iconotecnologies.damner.web.rest;

import io.micrometer.core.annotation.Timed;
import java.util.List;
import javax.annotation.Resource;
import org.iconotecnologies.damner.domain.catalogos.MoscatiEtapaCita;
import org.iconotecnologies.damner.repository.catalogos.MoscatiEtapaCitaRepository;
import org.iconotecnologies.damner.service.MoscatiEtapaCitaService;
import org.iconotecnologies.damner.service.criteria.catalogos.MoscatiEtapaCitaCriteria;
import org.iconotecnologies.damner.service.dto.MoscatiPromocionesDTO;
import org.iconotecnologies.damner.service.dto.catalogos.MoscatiEtapaCitaDTO;
import org.iconotecnologies.damner.web.rest.util.PaginationUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/etapaCita")
public class MoscatiEtapaCitaResource {

    public MoscatiEtapaCitaService service;

    public MoscatiEtapaCitaResource(MoscatiEtapaCitaService service) {
        this.service = service;
    }

    @Timed
    @GetMapping("")
    public ResponseEntity<List<MoscatiEtapaCitaDTO>> findAll(Pageable pageable, MoscatiEtapaCitaCriteria criteria) {
        Page<MoscatiEtapaCitaDTO> moscatiEtapaCitaDto = this.service.findAll(pageable, criteria);
        return ResponseEntity
            .ok()
            .headers(PaginationUtil.generatePaginationHttpHeaders(moscatiEtapaCitaDto, "/api/promociones"))
            .body(moscatiEtapaCitaDto.getContent());
    }

    @Timed
    @GetMapping("/active")
    public ResponseEntity<List<MoscatiEtapaCitaDTO>> findActive() {
        return ResponseEntity.ok(this.service.findActive());
    }

    @Timed
    @GetMapping("/{id}")
    public ResponseEntity<MoscatiEtapaCitaDTO> findOne(@PathVariable Integer id) {
        return ResponseEntity.ok(this.service.findOne(id));
    }

    @Timed
    @PostMapping("")
    public ResponseEntity<MoscatiEtapaCitaDTO> create(@RequestBody MoscatiEtapaCitaDTO situacionHorario) {
        return ResponseEntity.ok(this.service.create(situacionHorario));
    }

    @Timed
    @PutMapping("")
    public ResponseEntity<MoscatiEtapaCitaDTO> update(@RequestBody MoscatiEtapaCitaDTO situacionHorario) {
        return ResponseEntity.ok(this.service.update(situacionHorario));
    }

    @Timed
    @DeleteMapping("/{id}")
    public ResponseEntity<MoscatiEtapaCitaDTO> delete(@PathVariable Integer id) {
        return ResponseEntity.ok(this.service.delete(id));
    }
}
