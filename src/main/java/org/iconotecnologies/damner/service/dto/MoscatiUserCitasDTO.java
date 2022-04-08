package org.iconotecnologies.damner.service.dto;

import java.io.Serializable;
import java.time.ZonedDateTime;
import org.iconotecnologies.damner.service.dto.catalogos.MoscatiEtapaCitaDTO;
import org.iconotecnologies.damner.service.dto.catalogos.MoscatiTipoCitaDTO;

public class MoscatiUserCitasDTO implements Serializable {

    protected Integer id;
    private MoscatiTipoCitaDTO tipoCita;
    private String fechaHoraSolicitud;
    private String fechaHoraCita;
    private MoscatiUserDTO doctor;
    private MoscatiUserDTO user;
    private MoscatiEtapaCitaDTO etapaCita;
    private String agoraChanel;
    private ZonedDateTime fechaHoraFin;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public MoscatiTipoCitaDTO getTipoCita() {
        return tipoCita;
    }

    public void setTipoCita(MoscatiTipoCitaDTO tipoCita) {
        this.tipoCita = tipoCita;
    }

    public String getFechaHoraSolicitud() {
        return fechaHoraSolicitud;
    }

    public void setFechaHoraSolicitud(String fechaHoraSolicitud) {
        this.fechaHoraSolicitud = fechaHoraSolicitud;
    }

    public String getFechaHoraCita() {
        return fechaHoraCita;
    }

    public void setFechaHoraCita(String fechaHoraCita) {
        this.fechaHoraCita = fechaHoraCita;
    }

    public MoscatiUserDTO getDoctor() {
        return doctor;
    }

    public void setDoctor(MoscatiUserDTO doctor) {
        this.doctor = doctor;
    }

    public MoscatiUserDTO getUser() {
        return user;
    }

    public void setUser(MoscatiUserDTO user) {
        this.user = user;
    }

    public MoscatiEtapaCitaDTO getEtapaCita() {
        return etapaCita;
    }

    public void setEtapaCita(MoscatiEtapaCitaDTO etapaCita) {
        this.etapaCita = etapaCita;
    }

    public String getAgoraChanel() {
        return agoraChanel;
    }

    public void setAgoraChanel(String agoraChanel) {
        this.agoraChanel = agoraChanel;
    }

    public ZonedDateTime getFechaHoraFin() {
        return fechaHoraFin;
    }

    public void setFechaHoraFin(ZonedDateTime fechaHoraFin) {
        this.fechaHoraFin = fechaHoraFin;
    }
}
