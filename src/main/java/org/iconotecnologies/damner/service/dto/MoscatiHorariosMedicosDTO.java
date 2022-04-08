package org.iconotecnologies.damner.service.dto;

import java.io.Serializable;

public class MoscatiHorariosMedicosDTO implements Serializable {

    protected Integer id;
    private MoscatiUserDTO user;
    private String horaInicio;
    private String horaFin;
    private Integer dia;
    private String estatus;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public MoscatiUserDTO getUser() {
        return user;
    }

    public void setUser(MoscatiUserDTO user) {
        this.user = user;
    }

    public String getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(String horaInicio) {
        this.horaInicio = horaInicio;
    }

    public String getHoraFin() {
        return horaFin;
    }

    public void setHoraFin(String horaFin) {
        this.horaFin = horaFin;
    }

    public Integer getDia() {
        return dia;
    }

    public void setDia(Integer dia) {
        this.dia = dia;
    }

    public String getEstatus() {
        return estatus;
    }

    public void setEstatus(String estatus) {
        this.estatus = estatus;
    }
}
