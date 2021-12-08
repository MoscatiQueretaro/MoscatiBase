package org.iconotecnologies.damner.service.dto.files;

import java.io.Serializable;

public class PhotoUserAlbumDTO implements Serializable {

    private String id;
    private Long UserId;
    private String fotoPersonaId;
    private Integer albumTypeId;
    private String estatus;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Long getUserId() {
        return UserId;
    }

    public void setUserId(Long userId) {
        UserId = userId;
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
