package org.iconotecnologies.damner.domain;

import java.io.Serializable;
import javax.persistence.*;

@Entity
@Table(name = "DAMNER_ROL_AUTHORITIES")
public class DamnerRolAuthorities implements Serializable {

    public static final String ENTITY_NAME = "damner-Rol-Authorities";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Integer id;

    @JoinColumn(name = "DAMNER_ROL_ID")
    @ManyToOne
    protected DamnerRol damnerRol;

    @JoinColumn(name = "DAMNER_AUTHORITIES_ID")
    @ManyToOne
    protected DamnerAuthorities damnerAuthirities;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public DamnerRol getDamnerRol() {
        return damnerRol;
    }

    public void setDamnerRol(DamnerRol damnerRol) {
        this.damnerRol = damnerRol;
    }

    public DamnerAuthorities getDamnerAuthirities() {
        return damnerAuthirities;
    }

    public void setDamnerAuthirities(DamnerAuthorities damnerAuthirities) {
        this.damnerAuthirities = damnerAuthirities;
    }
}
