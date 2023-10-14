package org.iconotecnologies.damner.web.rest;

import io.micrometer.core.annotation.Timed;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import org.iconotecnologies.damner.service.MoscatiMedicamentosService;
import org.iconotecnologies.damner.service.dto.MoscatiMedicamentosDTO;
import org.iconotecnologies.damner.web.rest.util.HeaderUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.ResponseUtil;

@RestController
@RequestMapping("/api/medicamentos")
public class MoscatiMedicamentosResource {

    private final MoscatiMedicamentosService service;

    public MoscatiMedicamentosResource(MoscatiMedicamentosService service) {
        this.service = service;
    }

    @PostMapping("")
    @Timed
    public ResponseEntity<MoscatiMedicamentosDTO> create(@RequestBody MoscatiMedicamentosDTO moscatiMedicamentoDTO)
        throws URISyntaxException {
        MoscatiMedicamentosDTO dto = this.service.save(moscatiMedicamentoDTO);
        return ResponseEntity
            .created(new URI("/api/medicamentos/" + dto.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("", dto.getId().toString()))
            .body(dto);
    }

    @GetMapping("")
    @Timed
    public ResponseEntity<List<MoscatiMedicamentosDTO>> getAll() {
        List<MoscatiMedicamentosDTO> medicamentosDTOList = service.getAll();
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(medicamentosDTOList));
    }
}
