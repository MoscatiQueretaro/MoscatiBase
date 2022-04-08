package org.iconotecnologies.damner.service.dto;

import java.io.Serializable;
import org.iconotecnologies.damner.service.dto.catalogos.MoscatiEspecialidadesDTO;

public class MoscatiDirectorioMedicoDTO implements Serializable {

    protected Integer id;
    private MoscatiEspecialidadesDTO especialidad;
    private MoscatiUserDTO user;
    private String consultorio;
    private String horarios;
    private String detalles;
    private String titulo;
    private String idioma;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public MoscatiEspecialidadesDTO getEspecialidad() {
        return especialidad;
    }

    public void setEspecialidad(MoscatiEspecialidadesDTO especialidad) {
        this.especialidad = especialidad;
    }

    public MoscatiUserDTO getUser() {
        return user;
    }

    public void setUser(MoscatiUserDTO user) {
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
