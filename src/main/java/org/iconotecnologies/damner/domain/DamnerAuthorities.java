package org.iconotecnologies.damner.domain;

import java.io.Serializable;
import javax.persistence.*;

@Entity
@Table(name = "DAMNER_AUTHORITIES")
public class DamnerAuthorities implements Serializable {

    public static final String ENTITY_NAME = "damner-Authorities";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Integer id;

    @Column(name = "ACCION")
    protected String accion;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAccion() {
        return accion;
    }

    public void setAccion(String accion) {
        this.accion = accion;
    }
}
