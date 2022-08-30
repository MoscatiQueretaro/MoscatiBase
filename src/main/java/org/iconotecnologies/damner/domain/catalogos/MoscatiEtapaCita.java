package org.iconotecnologies.damner.domain.catalogos;

import java.io.Serializable;
import javax.persistence.*;

@Entity
@Table(name = "moscati_etapa_cita")
public class MoscatiEtapaCita implements Serializable {

    public static final String ENTITY_NAME = "moscati-etapa-cita";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Integer id;

    @Column(name = "MOSCATI_DESCRIPCION")
    protected String descripcion;

    @Column(name = "MOSCATI_ESTATUS")
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
