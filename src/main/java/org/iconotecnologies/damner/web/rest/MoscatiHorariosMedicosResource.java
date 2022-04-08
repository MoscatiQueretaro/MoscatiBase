package org.iconotecnologies.damner.web.rest;

import io.micrometer.core.annotation.Timed;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import org.iconotecnologies.damner.domain.MoscatiDirectorioMedico;
import org.iconotecnologies.damner.domain.MoscatiHorariosMedicos;
import org.iconotecnologies.damner.service.MoscatiHorariosMedicosService;
import org.iconotecnologies.damner.service.criteria.MoscatiDirectorioMedicoCriteria;
import org.iconotecnologies.damner.service.dto.MoscatiDirectorioMedicoDTO;
import org.iconotecnologies.damner.service.dto.MoscatiHorariosMedicosDTO;
import org.iconotecnologies.damner.web.rest.errors.BadRequestAlertException;
import org.iconotecnologies.damner.web.rest.util.HeaderUtil;
import org.iconotecnologies.damner.web.rest.util.PaginationUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.ResponseUtil;

@RestController
@RequestMapping("/api/horariosMedicos")
public class MoscatiHorariosMedicosResource {

    private final MoscatiHorariosMedicosService service;

    public MoscatiHorariosMedicosResource(MoscatiHorariosMedicosService service) {
        this.service = service;
    }

    @PostMapping("")
    @Timed
    public ResponseEntity<MoscatiHorariosMedicosDTO> create(@RequestBody MoscatiHorariosMedicosDTO moscatiHorariosMedicosDTO)
        throws URISyntaxException {
        moscatiHorariosMedicosDTO.setEstatus("A");
        if (moscatiHorariosMedicosDTO.getId() != null) {
            throw new BadRequestAlertException(
                "Surgió un error al momento de guardar el directorio Medico",
                MoscatiHorariosMedicos.ENTITY_NAME,
                "NO DEBE EXISTIE EL ID"
            );
        }
        MoscatiHorariosMedicosDTO dto = this.service.save(moscatiHorariosMedicosDTO);
        return ResponseEntity
            .created(new URI("/api/horariosMedicos/" + dto.getId().toString()))
            .headers(HeaderUtil.createEntityCreationAlert(MoscatiHorariosMedicos.ENTITY_NAME, dto.getId().toString()))
            .body(dto);
    }

    @PostMapping("/saveAll")
    @Timed
    public ResponseEntity<List<MoscatiHorariosMedicosDTO>> saveAll(@RequestBody List<MoscatiHorariosMedicosDTO> moscatiHorariosMedicosDTO)
        throws URISyntaxException {
        List<MoscatiHorariosMedicosDTO> dto = this.service.saveAll(moscatiHorariosMedicosDTO);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(dto));
    }

    @GetMapping("/{userId}")
    @Timed
    public ResponseEntity<List<MoscatiHorariosMedicosDTO>> findAllByDoctorId(@PathVariable Long userId) {
        List<MoscatiHorariosMedicosDTO> dto = this.service.findAllByUserId(userId);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(dto));
    }
    //    @GetMapping("")
    //    @Timed
    //    public ResponseEntity<List<MoscatiDirectorioMedicoDTO>> getAll(MoscatiDirectorioMedicoCriteria criteria, Pageable pageable) {
    //        Page<MoscatiDirectorioMedicoDTO> moscatiDirectorio = this.service.getAll(criteria, pageable);
    //        return ResponseEntity
    //            .ok()
    //            .headers(PaginationUtil.generatePaginationHttpHeaders(moscatiDirectorio, "/api/directoriomedico"))
    //            .body(moscatiDirectorio.getContent());
    //    }
}
