package org.iconotecnologies.damner.domain.files;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "MOSCATI_PHOTO_USER_ALBUM")
public class PhotoUserAlbum implements Serializable {

    public static final String ENTITY_NAME = "damner-user-profile";

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private String id;

    @Column(name = "MOSCATI_USER_ID")
    private Long userId;

    @Column(name = "MOSCATI_PHOTO_USER_ID")
    private String fotoPersonaId;

    @Column(name = "MOSCATI_ALBUM_TYPE_ID")
    private Integer albumTypeId;

    @Column(name = "ESTATUS")
    private String estatus;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getFotoPersonaId() {
        return fotoPersonaId;
    }

    public void setFotoPersonaId(String fotoPersonaId) {
        this.fotoPersonaId = fotoPersonaId;
    }

    public Integer getAlbumTypeId() {
        return albumTypeId;
    }

    public void setAlbumTypeId(Integer albumTypeId) {
        this.albumTypeId = albumTypeId;
    }

    public String getEstatus() {
        return estatus;
    }

    public void setEstatus(String estatus) {
        this.estatus = estatus;
    }
}
