package org.iconotecnologies.damner.domain;

import java.io.Serializable;
import javax.persistence.*;

@Entity
@Table(name = "DAMNER_USER_ROL")
public class DamnerUserRol implements Serializable {

    public static final String ENTITY_NAME = "damner-Rol-User-Authorities";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Integer id;

    @Column(name = "DAMNER_USER_ID")
    protected Long damnerUserId;

    @JoinColumn(name = "DAMNER_ROL_ID")
    @ManyToOne
    protected DamnerRol damnerRol;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Long getDamnerUserId() {
        return damnerUserId;
    }

    public void setDamnerUserId(Long damnerUserId) {
        this.damnerUserId = damnerUserId;
    }

    public DamnerRol getDamnerRol() {
        return damnerRol;
    }

    public void setDamnerRol(DamnerRol damnerRol) {
        this.damnerRol = damnerRol;
    }
}
