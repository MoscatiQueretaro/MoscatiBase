package org.iconotecnologies.damner.service.dto.catalogos;

import java.io.Serializable;

public class MoscatiEtapaCitaDTO implements Serializable {

    private Integer id;
    private String descripcion;
    protected String estatus;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getEstatus() {
        return estatus;
    }

    public void setEstatus(String estatus) {
        this.estatus = estatus;
    }
}
