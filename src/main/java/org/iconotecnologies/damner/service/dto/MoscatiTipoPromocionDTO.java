package org.iconotecnologies.damner.service.dto;

import java.io.Serializable;
import java.util.Objects;

public class MoscatiTipoPromocionDTO implements Serializable {

    private Integer id;
    private String descripcion;

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
}
