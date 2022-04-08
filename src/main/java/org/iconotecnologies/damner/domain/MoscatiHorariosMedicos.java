package org.iconotecnologies.damner.domain;

import java.io.Serializable;
import java.sql.Time;
import java.time.ZonedDateTime;
import javax.persistence.*;
import jdk.jshell.Snippet;

@Entity
@Table(name = "moscati_horarios_medicos")
public class MoscatiHorariosMedicos implements Serializable {

    public static final String ENTITY_NAME = "moscati-horarios-medicos";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Integer id;

    @JoinColumn(name = "MOSCATI_USER_ID", updatable = false)
    @ManyToOne
    private MoscatiUser user;

    @Column(name = "MOSCATI_HORA_INICIO")
    private ZonedDateTime horaInicio;

    @Column(name = "MOSCATI_HORA_FIN")
    private ZonedDateTime horaFin;

    @Column(name = "MOSCATI_NOMBRE_DIA")
    private Integer dia;

    @Column(name = "MOSCATI_ESTATUS")
    private String estatus;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public MoscatiUser getUser() {
        return user;
    }

    public void setUser(MoscatiUser user) {
        this.user = user;
    }

    public ZonedDateTime getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(ZonedDateTime horaInicio) {
        this.horaInicio = horaInicio;
    }

    public ZonedDateTime getHoraFin() {
        return horaFin;
    }

    public void setHoraFin(ZonedDateTime horaFin) {
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
