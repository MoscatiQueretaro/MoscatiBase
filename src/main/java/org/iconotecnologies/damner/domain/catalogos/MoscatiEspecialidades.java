package org.iconotecnologies.damner.domain.catalogos;

import java.io.Serializable;
import javax.persistence.*;

@Entity
@Table(name = "MOSCATI_ESPECIALIDADES")
public class MoscatiEspecialidades implements Serializable {

    public static final String ENTITY_NAME = "moscati-especialidades";

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
