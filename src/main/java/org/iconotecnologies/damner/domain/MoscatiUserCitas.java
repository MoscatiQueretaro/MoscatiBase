package org.iconotecnologies.damner.domain;

import java.io.Serializable;
import java.time.ZonedDateTime;
import javax.persistence.*;
import org.iconotecnologies.damner.domain.catalogos.MoscatiEtapaCita;
import org.iconotecnologies.damner.domain.catalogos.MoscatiTipoCita;

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
@Table(name = "moscati_user_citas")
public class MoscatiUserCitas implements Serializable {

    public static final String ENTITY_NAME = "moscati-user-citas";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Integer id;

    @JoinColumn(name = "MOSCATI_TIPO_CITA_ID", updatable = false)
    @ManyToOne
    private MoscatiTipoCita tipoCita;

    @Column(name = "MOSCATI_FECHA_HORA_SOLICITUD")
    private ZonedDateTime fechaHoraSolicitud;

    @Column(name = "MOSCATI_FECHA_HORA_CITA")
    private ZonedDateTime fechaHoraCita;

    @JoinColumn(name = "MOSCATI_DOCTOR_ID", updatable = false)
    @ManyToOne
    private MoscatiUser doctor;

    @JoinColumn(name = "MOSCATI_USER_ID", updatable = false)
    @ManyToOne
    private MoscatiUser user;

    @JoinColumn(name = "MOSCATI_ETAPA_CITA_ID")
    @ManyToOne
    private MoscatiEtapaCita etapaCita;

    @Column(name = "MOSCATI_AGORA_CHANEL_ID")
    private String agoraChanel;

    @Column(name = "MOSCATI_FECHA_HORA_FIN")
    private ZonedDateTime fechaHoraFin;

    @JoinColumn(name = "MOSCATI_PAGOS_STRIPE_ID", updatable = false)
    @ManyToOne
    private MoscatiPagosStripe pagosStripe;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public MoscatiTipoCita getTipoCita() {
        return tipoCita;
    }

    public void setTipoCita(MoscatiTipoCita tipoCita) {
        this.tipoCita = tipoCita;
    }

    public ZonedDateTime getFechaHoraSolicitud() {
        return fechaHoraSolicitud;
    }

    public void setFechaHoraSolicitud(ZonedDateTime fechaHoraSolicitud) {
        this.fechaHoraSolicitud = fechaHoraSolicitud;
    }

    public ZonedDateTime getFechaHoraCita() {
        return fechaHoraCita;
    }

    public void setFechaHoraCita(ZonedDateTime fechaHoraCita) {
        this.fechaHoraCita = fechaHoraCita;
    }

    public MoscatiUser getDoctor() {
        return doctor;
    }

    public void setDoctor(MoscatiUser doctor) {
        this.doctor = doctor;
    }

    public MoscatiUser getUser() {
        return user;
    }

    public void setUser(MoscatiUser user) {
        this.user = user;
    }

    public MoscatiEtapaCita getEtapaCita() {
        return etapaCita;
    }

    public void setEtapaCita(MoscatiEtapaCita etapaCita) {
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

    public MoscatiPagosStripe getPagosStripe() {
        return pagosStripe;
    }

    public void setPagosStripe(MoscatiPagosStripe pagosStripe) {
        this.pagosStripe = pagosStripe;
    }
}
