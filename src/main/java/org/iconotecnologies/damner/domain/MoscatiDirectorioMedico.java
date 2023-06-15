package org.iconotecnologies.damner.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.iconotecnologies.damner.domain.catalogos.MoscatiEspecialidades;

/**
 *     iCoNo Estuvo Aqui
 * ......   (\_/)
 * ......  ( '_')           coment error        \__/         \__/          \__/        \__/
 * ..../""""""""""""\======░ ▒▓▓█< *  *  *     (UwU)        (OoO)        0=_0=) !     (XnX)
 * /"""""""""""""""""""\                      //||\\       //||\\         //||\\     //||\\
 * \_@_@_@_@_@_@_@_@_@_/                       bug           bug            bug         bug
 *                                          trabajando    sorprendido      cagado     despues
 *
 */
@Entity
@Table(name = "MOSCATI_DIRECTORIO_MEDICO")
public class MoscatiDirectorioMedico implements Serializable {

    public static final String ENTITY_NAME = "moscati-directorio-medico";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Integer id;

    @JoinColumn(name = "MOSCATI_ESPECIALIDADES_ID")
    @ManyToOne
    private MoscatiEspecialidades especialidad;

    @JoinColumn(name = "MOSCATI_USER_ID")
    @ManyToOne
    private MoscatiUser user;

    @Column(name = "MOSCATI_CONSULTORIO")
    private String consultorio;

    @Column(name = "MOSCATI_HORARIOS")
    private String horarios;

    @Column(name = "MOSCATI_DETALLES")
    private String detalles;

    @Column(name = "MOSCATI_TITULO")
    private String titulo;

    @Column(name = "MOSCATI_IDIOMA")
    private String idioma;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public MoscatiEspecialidades getEspecialidad() {
        return especialidad;
    }

    public void setEspecialidad(MoscatiEspecialidades especialidad) {
        this.especialidad = especialidad;
    }

    public MoscatiUser getUser() {
        return user;
    }

    public void setUser(MoscatiUser user) {
        this.user = user;
    }

    public String getConsultorio() {
        return consultorio;
    }

    public void setConsultorio(String consultorio) {
        this.consultorio = consultorio;
    }

    public String getHorarios() {
        return horarios;
    }

    public void setHorarios(String horarios) {
        this.horarios = horarios;
    }

    public String getDetalles() {
        return detalles;
    }

    public void setDetalles(String detalles) {
        this.detalles = detalles;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getIdioma() {
        return idioma;
    }

    public void setIdioma(String idioma) {
        this.idioma = idioma;
    }
}
