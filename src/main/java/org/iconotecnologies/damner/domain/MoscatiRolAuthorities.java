package org.iconotecnologies.damner.domain;

import java.io.Serializable;
import javax.persistence.*;

/**
 *     iCoNo Estuvo Aqui
 * ......   (\_/)
 * ......  ( '_')           coment error        \__/         \__/          \__/        \__/
 * ..../""""""""""""\======░ ▒▓▓█D *  *  *     (UwU)        (OoO)        0=_0=) !     (XnX)
 * /"""""""""""""""""""\                      //||\\       //||\\         //||\\     //||\\
 * \_@_@_@_@_@_@_@_@_@_/                       bug           bug            bug         bug
 *                                          trabajando    sorprendido      cagado     despues
 *
 */
@Entity
@Table(name = "MOSCATI_ROL_AUTHORITIES")
public class MoscatiRolAuthorities implements Serializable {

    public static final String ENTITY_NAME = "damner-Rol-Authorities";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Integer id;

    @JoinColumn(name = "MOSCATI_ROL_ID")
    @ManyToOne
    protected MoscatiRol moscatiRol;

    @JoinColumn(name = "MOSCATI_AUTHORITIES_ID")
    @ManyToOne
    protected MoscatiAuthorities damnerAuthirities;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public MoscatiRol getMoscatiRol() {
        return moscatiRol;
    }

    public void setMoscatiRol(MoscatiRol moscatiRol) {
        this.moscatiRol = moscatiRol;
    }

    public MoscatiAuthorities getDamnerAuthirities() {
        return damnerAuthirities;
    }

    public void setDamnerAuthirities(MoscatiAuthorities damnerAuthirities) {
        this.damnerAuthirities = damnerAuthirities;
    }
}
