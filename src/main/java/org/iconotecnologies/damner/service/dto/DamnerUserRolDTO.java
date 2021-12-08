package org.iconotecnologies.damner.service.dto;

import java.io.Serializable;
import org.iconotecnologies.damner.domain.DamnerRol;

public class DamnerUserRolDTO implements Serializable {

    protected Integer id;

    protected String damnerUserId;

    protected DamnerRol damnerRol;

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

    public DamnerRol getDamnerRol() {
        return damnerRol;
    }

    public void setDamnerRol(DamnerRol damnerRol) {
        this.damnerRol = damnerRol;
    }

    @Override
    public String toString() {
        return "DamnerUserRolDTO{" + "id=" + id + ", damnerUserId='" + damnerUserId + '\'' + ", damnerRol=" + damnerRol + '}';
    }
}
