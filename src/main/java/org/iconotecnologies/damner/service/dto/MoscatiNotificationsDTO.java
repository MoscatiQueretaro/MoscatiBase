package org.iconotecnologies.damner.service.dto;

import java.io.Serializable;
import java.time.ZonedDateTime;
import org.iconotecnologies.damner.service.dto.catalogos.MoscatiAccionNotificationsDTO;

public class MoscatiNotificationsDTO implements Serializable {

    private String id;
    private ZonedDateTime fecha;
    private String titulo;
    private String descripcion;
    private MoscatiAccionNotificationsDTO accionId;
    private String params;
    private MoscatiUserDTO autor;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public ZonedDateTime getFecha() {
        return fecha;
    }

    public void setFecha(ZonedDateTime fecha) {
        this.fecha = fecha;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public MoscatiAccionNotificationsDTO getAccionId() {
        return accionId;
    }

    public void setAccionId(MoscatiAccionNotificationsDTO accionId) {
        this.accionId = accionId;
    }

    public String getParams() {
        return params;
    }

    public void setParams(String params) {
        this.params = params;
    }

    public MoscatiUserDTO getAutor() {
        return autor;
    }

    public void setAutor(MoscatiUserDTO autor) {
        this.autor = autor;
    }
}
