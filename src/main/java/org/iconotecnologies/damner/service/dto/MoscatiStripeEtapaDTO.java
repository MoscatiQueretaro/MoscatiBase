package org.iconotecnologies.damner.service.dto;

import java.io.Serializable;

public class MoscatiStripeEtapaDTO implements Serializable {

    protected Integer id;
    protected String descripcion;

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
