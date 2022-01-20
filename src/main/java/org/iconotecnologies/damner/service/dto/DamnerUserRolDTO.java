package org.iconotecnologies.damner.service.dto;

import java.io.Serializable;
import org.iconotecnologies.damner.domain.MoscatiRol;

public class DamnerUserRolDTO implements Serializable {

    protected Integer id;

    protected String damnerUserId;

    protected MoscatiRol moscatiRol;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDamnerUserId() {
        return damnerUserId;
    }

    public void setDamnerUserId(String damnerUserId) {
        this.damnerUserId = damnerUserId;
    }

    public MoscatiRol getDamnerRol() {
        return moscatiRol;
    }

    public void setDamnerRol(MoscatiRol moscatiRol) {
        this.moscatiRol = moscatiRol;
    }

    @Override
    public String toString() {
        return "DamnerUserRolDTO{" + "id=" + id + ", damnerUserId='" + damnerUserId + '\'' + ", damnerRol=" + moscatiRol + '}';
    }
}
