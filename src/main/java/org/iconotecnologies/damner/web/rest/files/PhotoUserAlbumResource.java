package org.iconotecnologies.damner.web.rest.files;

import io.micrometer.core.annotation.Timed;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.iconotecnologies.damner.domain.DamnerUserDetails;
import org.iconotecnologies.damner.domain.files.PhotoUserAlbum;
import org.iconotecnologies.damner.security.SecurityUtils;
import org.iconotecnologies.damner.service.UserService;
import org.iconotecnologies.damner.service.dto.files.PhotoUserAlbumDTO;
import org.iconotecnologies.damner.service.files.PhotoUserAlbumService;
import org.iconotecnologies.damner.web.rest.AccountResource;
import org.iconotecnologies.damner.web.rest.errors.BadRequestAlertException;
import org.iconotecnologies.damner.web.rest.util.HeaderUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.ResponseUtil;

@RestController
@RequestMapping("/api/photo-user-album")
public class PhotoUserAlbumResource {

    private final PhotoUserAlbumService service;
    private final UserService userService;

    public PhotoUserAlbumResource(PhotoUserAlbumService service, UserService userService) {
        this.service = service;
        this.userService = userService;
    }

    @PostMapping("")
    @Timed
    public ResponseEntity<PhotoUserAlbumDTO> create(@RequestBody PhotoUserAlbumDTO photoUserAlbumDTO) throws URISyntaxException {
        if (photoUserAlbumDTO.getId() != null) {
            throw new BadRequestAlertException(
                "Surgió un error al momento de guardar el photo-user-album",
                PhotoUserAlbum.ENTITY_NAME,
                "NO DEBE EXISTIE EL ID"
            );
        }

        PhotoUserAlbumDTO dto = this.service.save(photoUserAlbumDTO);
        return ResponseEntity
            .created(new URI("/api/photo-user-album/" + dto.getId().toString()))
            .headers(HeaderUtil.createEntityCreationAlert(PhotoUserAlbum.ENTITY_NAME, dto.getId().toString()))
            .body(dto);
    }

    @PutMapping("")
    @Timed
    public ResponseEntity<PhotoUserAlbumDTO> update(@RequestBody PhotoUserAlbumDTO photoUserAlbumDTO) throws URISyntaxException {
        if (photoUserAlbumDTO.getId() == null) {
            this.create(photoUserAlbumDTO);
        }
        PhotoUserAlbumDTO dto = this.service.save(photoUserAlbumDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(PhotoUserAlbum.ENTITY_NAME, dto.getId().toString()))
            .body(dto);
    }

    //    @GetMapping("")
    //    @Timed
    //    public ResponseEntity<List<PhotoUserAlbumDTO>> getAll(PhotoUserAlbumCriteria criteria, Pageable pageable){
    //        Page<PhotoUserAlbumDTO> institucionDTOS = this.service.getAll(criteria, pageable);
    //        HttpHeaders httpHeaders = PaginationUtil.generatePaginationHttpHeaders(institucionDTOS,"/api/photo-user-album");
    //        return new ResponseEntity<>(institucionDTOS.getContent(), httpHeaders, HttpStatus.OK);
    //    }

    @GetMapping("/active")
    @Timed
    public ResponseEntity<List<PhotoUserAlbum>> getInstitucions() {
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(this.service.getAllActive()));
    }

    @GetMapping("/{id}")
    @Timed
    public ResponseEntity<PhotoUserAlbumDTO> getOne(@PathVariable String id) {
        PhotoUserAlbumDTO dto = this.service.findById(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(dto));
    }

    @DeleteMapping("/{id}")
    @Timed
    public ResponseEntity<PhotoUserAlbumDTO> getAll(@PathVariable String id) {
        this.service.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(PhotoUserAlbum.ENTITY_NAME, id.toString())).build();
    }
}
