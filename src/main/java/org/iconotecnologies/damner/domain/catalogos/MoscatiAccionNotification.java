package org.iconotecnologies.damner.domain.catalogos;

import java.io.Serializable;
import javax.persistence.*;

@Entity
@Table(name = "MOSCATI_ACCION_NOTIFICATIONS")
public class MoscatiAccionNotification implements Serializable {

    public static final String ENTITY_NAME = "moscati-accion-notifications";

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
