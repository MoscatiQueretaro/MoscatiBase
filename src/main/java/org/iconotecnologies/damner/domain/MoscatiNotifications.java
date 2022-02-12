package org.iconotecnologies.damner.domain;

import java.time.ZonedDateTime;
import javax.persistence.*;
import org.hibernate.annotations.GenericGenerator;
import org.iconotecnologies.damner.domain.catalogos.MoscatiAccionNotification;
import org.springframework.data.annotation.CreatedBy;

@Entity
@Table(name = "MOSCATI_NOTIFICATION")
public class MoscatiNotifications {

    public static final String ENTITY_NAME = "notificacion";

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "ID")
    private String id;

    @Column(name = "MOSCATI_FECHA")
    private ZonedDateTime fecha;

    @Column(name = "MOSCATI_TITULO")
    private String titulo;

    @Column(name = "MOSCATI_DESCRIPCION")
    private String descripcion;

    @JoinColumn(name = "MOSCATI_ACCION_ID")
    @ManyToOne
    private MoscatiAccionNotification accionId;

    @Column(name = "MOSCATI_PARAMS")
    private String params;

    @CreatedBy
    @JoinColumn(name = "MOSCATI_USER_ID", updatable = false)
    @ManyToOne
    private MoscatiUser autor;

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

    public MoscatiAccionNotification getAccionId() {
        return accionId;
    }

    public void setAccionId(MoscatiAccionNotification accionId) {
        this.accionId = accionId;
    }

    public String getParams() {
        return params;
    }

    public void setParams(String params) {
        this.params = params;
    }

    public MoscatiUser getAutor() {
        return autor;
    }

    public void setAutor(MoscatiUser autor) {
        this.autor = autor;
    }
}
