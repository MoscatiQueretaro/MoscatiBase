package org.iconotecnologies.damner.domain;

import java.io.Serializable;
import javax.persistence.*;

@Entity
@Table(name = "MOSCATI_TIPO_PROMOCION")
public class MoscatiTipoPromocion implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "MOSCATI_DESCRIPCION")
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
