package org.iconotecnologies.damner.domain;

import java.time.ZonedDateTime;
import javax.persistence.*;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedBy;

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
@Table(name = "MOSCATI_NOTIFICATION_USER")
public class MoscatiNotificationsUser {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "ID")
    private String id;

    @ManyToOne
    @JoinColumn(name = "MOSCATI_NOTIFICATION_ID")
    private MoscatiNotifications notificacion;

    @CreatedBy
    @JoinColumn(name = "MOSCATI_USER_ID", updatable = false)
    @ManyToOne
    private MoscatiUser userId;

    @Column(name = "MOSCATI_VISTA_FECHA")
    private ZonedDateTime fechaVista;

    @Column(name = "MOSCATI_FECHA")
    private ZonedDateTime fecha;

    @Column(name = "VISTA")
    private Boolean vista;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public MoscatiNotifications getNotificacion() {
        return notificacion;
    }

    public void setNotificacion(MoscatiNotifications notificacion) {
        this.notificacion = notificacion;
    }

    public MoscatiUser getUserId() {
        return userId;
    }

    public void setUserId(MoscatiUser userId) {
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
