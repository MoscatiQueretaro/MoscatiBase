package org.iconotecnologies.damner.domain;

import java.io.Serializable;
import javax.persistence.*;

@Entity
@Table(name = "MOSCATI_USER_ROL")
public class MoscatiUserRol implements Serializable {

    public static final String ENTITY_NAME = "damner-Rol-User-Authorities";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Integer id;

    @Column(name = "MOSCATI_USER_ID")
    protected Long damnerUserId;

    @JoinColumn(name = "MOSCATI_ROL_ID")
    @ManyToOne
    protected MoscatiRol moscatiRol;

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

    public MoscatiRol getDamnerRol() {
        return moscatiRol;
    }

    public void setDamnerRol(MoscatiRol moscatiRol) {
        this.moscatiRol = moscatiRol;
    }
}
