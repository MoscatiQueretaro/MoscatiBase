package org.iconotecnologies.damner.web.rest;

import com.google.firebase.messaging.FirebaseMessagingException;
import io.micrometer.core.annotation.Timed;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import org.iconotecnologies.damner.domain.MoscatiUserCitas;
import org.iconotecnologies.damner.domain.files.PhotoUserAlbum;
import org.iconotecnologies.damner.service.MoscatiUserCitasService;
import org.iconotecnologies.damner.service.criteria.MoscatiUserCitasCriteria;
import org.iconotecnologies.damner.service.dto.MoscatiHorariosDisponiblesDTO;
import org.iconotecnologies.damner.service.dto.MoscatiUserCitasDTO;
import org.iconotecnologies.damner.web.rest.errors.BadRequestAlertException;
import org.iconotecnologies.damner.web.rest.util.HeaderUtil;
import org.iconotecnologies.damner.web.rest.util.PaginationUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.ResponseUtil;

@RestController
@RequestMapping("/api/userCitas")
public class MoscatiUserCitasResource {

    private final MoscatiUserCitasService service;

    public MoscatiUserCitasResource(MoscatiUserCitasService service) {
        this.service = service;
    }

    @PostMapping("")
    @Timed
    public ResponseEntity<MoscatiUserCitasDTO> create(@RequestBody MoscatiUserCitasDTO moscatiUserCitasDTO)
        throws URISyntaxException, FirebaseMessagingException {
        if (moscatiUserCitasDTO.getId() != null) {
            throw new BadRequestAlertException(
                "Surgió un error al momento de guardar el directorio Medico",
                MoscatiUserCitas.ENTITY_NAME,
                "NO DEBE EXISTIE EL ID"
            );
        }
        MoscatiUserCitasDTO dto = this.service.save(moscatiUserCitasDTO);
        return ResponseEntity
            .created(new URI("/api/userCitas/" + dto.getId().toString()))
            .headers(HeaderUtil.createEntityCreationAlert(MoscatiUserCitas.ENTITY_NAME, dto.getId().toString()))
            .body(dto);
    }

    @PutMapping("")
    @Timed
    public ResponseEntity<MoscatiUserCitasDTO> update(@RequestBody MoscatiUserCitasDTO moscatiUserCitasDTO)
        throws URISyntaxException, FirebaseMessagingException {
        if (moscatiUserCitasDTO.getId() == null) {
            this.create(moscatiUserCitasDTO);
        }
        MoscatiUserCitasDTO dto = this.service.save(moscatiUserCitasDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(PhotoUserAlbum.ENTITY_NAME, dto.getId().toString()))
            .body(dto);
    }

    @GetMapping("/{id}")
    @Timed
    public ResponseEntity<MoscatiUserCitasDTO> findAllById(@PathVariable Integer id) {
        MoscatiUserCitasDTO dto = this.service.findOneById(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(dto));
    }

    @GetMapping("")
    @Timed
    public ResponseEntity<List<MoscatiUserCitasDTO>> getAll(MoscatiUserCitasCriteria criteria, Pageable pageable) {
        Page<MoscatiUserCitasDTO> moscatiUserCitas = this.service.getAll(criteria, pageable);
        return ResponseEntity
            .ok()
            .headers(PaginationUtil.generatePaginationHttpHeaders(moscatiUserCitas, "/api/directoriomedico"))
            .body(moscatiUserCitas.getContent());
    }

    @PostMapping("/disponibles")
    @Timed
    public ResponseEntity<List<MoscatiHorariosDisponiblesDTO>> getHorariosDisponibles(
        @RequestBody MoscatiUserCitasDTO moscatiUserCitasDTO
    ) {
        List<MoscatiHorariosDisponiblesDTO> horariosDisponibles = this.service.getHorariosDisponibles(moscatiUserCitasDTO);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(horariosDisponibles));
    }
}
