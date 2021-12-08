package org.iconotecnologies.damner.service.files;

import java.util.List;
import org.iconotecnologies.damner.domain.files.PhotoUserAlbum;
import org.iconotecnologies.damner.repository.files.PhotoUserAlbumRepository;
import org.iconotecnologies.damner.service.dto.files.PhotoUserAlbumDTO;
import org.iconotecnologies.damner.service.mapper.PhotoUserAlbumMapper;
import org.iconotecnologies.damner.web.rest.errors.BadRequestAlertException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PhotoUserAlbumService {

    private final PhotoUserAlbumRepository repository;
    private final PhotoUserAlbumMapper mapper;

    public PhotoUserAlbumService(PhotoUserAlbumRepository repository, PhotoUserAlbumMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Transactional
    public PhotoUserAlbumDTO save(PhotoUserAlbumDTO photoUserAlbumDTO) {
        photoUserAlbumDTO.setAlbumTypeId(1);
        photoUserAlbumDTO.setEstatus("A");
        PhotoUserAlbum institucion = this.repository.save(this.mapper.toEntity(photoUserAlbumDTO));
        return this.mapper.toDto(institucion);
    }

    @Transactional(readOnly = true)
    public PhotoUserAlbumDTO findById(String id) {
        PhotoUserAlbum institucion =
            this.repository.findById(id).orElseThrow(() -> new BadRequestAlertException("", PhotoUserAlbum.ENTITY_NAME, "notFound"));
        return this.mapper.toDto(institucion);
    }

    @Transactional(readOnly = true)
    public List<PhotoUserAlbum> findByDescripcion(Integer descripcion) {
        return this.repository.findAllByAlbumTypeId(descripcion);
    }

    //    @Transactional(readOnly = true)
    //    public Page<PhotoUserAlbumDTO> getAll(InstitucionCriteria criteria, Pageable pageable){
    //        return this.repository.findAll(criteria.buildSpecification(), pageable).map(mapper::toDto);
    //    }

    public List<PhotoUserAlbum> getAllActive() {
        return this.repository.findAllByEstatus("A");
    }

    @Transactional(readOnly = true)
    public List<PhotoUserAlbum> selectAll() {
        return this.repository.findAll();
    }

    @Transactional
    public void delete(String id) {
        this.repository.findById(id)
            .ifPresent(
                photoUserAlbum -> {
                    String estatus = photoUserAlbum.getEstatus().equals("A") ? "I" : "A";
                    photoUserAlbum.setEstatus(estatus);
                    this.repository.save(photoUserAlbum);
                }
            );
    } // delete
}
