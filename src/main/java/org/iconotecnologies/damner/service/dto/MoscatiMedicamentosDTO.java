package org.iconotecnologies.damner.service.dto;

import java.io.Serializable;

public class MoscatiMedicamentosDTO implements Serializable {

    private Integer id;
    String descripcion;

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
