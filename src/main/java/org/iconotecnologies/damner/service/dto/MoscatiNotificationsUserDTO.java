package org.iconotecnologies.damner.service.dto;

import java.io.Serializable;
import java.time.ZonedDateTime;

public class MoscatiNotificationsUserDTO implements Serializable {

    private String id;
    private MoscatiNotificationsDTO notificacion;
    private MoscatiUserDTO userId;
    private ZonedDateTime fechaVista;
    private ZonedDateTime fecha;
    private Boolean vista;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public MoscatiNotificationsDTO getNotificacion() {
        return notificacion;
    }

    public void setNotificacion(MoscatiNotificationsDTO notificacion) {
        this.notificacion = notificacion;
    }

    public MoscatiUserDTO getUserId() {
        return userId;
    }

    public void setUserId(MoscatiUserDTO userId) {
        this.userId = userId;
    }

    public ZonedDateTime getFechaVista() {
        return fechaVista;
    }

    public void setFechaVista(ZonedDateTime fechaVista) {
        this.fechaVista = fechaVista;
    }

    public ZonedDateTime getFecha() {
        return fecha;
    }

    public void setFecha(ZonedDateTime fecha) {
        this.fecha = fecha;
    }

    public Boolean getVista() {
        return vista;
    }

    public void setVista(Boolean vista) {
        this.vista = vista;
    }
}
