package org.iconotecnologies.damner.domain;

import java.io.Serializable;
import javax.persistence.*;

@Entity
@Table(name = "DAMNER_ROL")
public class DamnerRol implements Serializable {

    public static final String ENTITY_NAME = "damner-Rol";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Integer id;

    @Column(name = "NOMBRE")
    protected String nombre;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
