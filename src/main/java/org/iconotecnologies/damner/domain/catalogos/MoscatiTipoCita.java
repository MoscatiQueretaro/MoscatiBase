package org.iconotecnologies.damner.domain.catalogos;

import java.io.Serializable;
import javax.persistence.*;

@Entity
@Table(name = "moscati_tipo_cita")
public class MoscatiTipoCita implements Serializable {

    public static final String ENTITY_NAME = "moscati-tipo-cita";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Integer id;

    @Column(name = "MOSCATI_DESCRIPCION")
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
