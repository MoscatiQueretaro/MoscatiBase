package org.iconotecnologies.damner.service.dto;

import java.io.Serializable;
import org.iconotecnologies.damner.domain.MoscatiUser;
import org.iconotecnologies.damner.domain.files.FotoPersona;
import org.iconotecnologies.damner.service.dto.files.FotoPersonaDTO;

public class MoscatiArticulosDTO implements Serializable {

    private Integer id;
    private String nombre;
    private String descripcion;
    private Integer precio;
    private FotoPersonaDTO foto;
    private MoscatiUserDTO autor;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getPrecio() {
        return precio;
    }

    public void setPrecio(Integer precio) {
        this.precio = precio;
    }

    public FotoPersonaDTO getFoto() {
        return foto;
    }

    public void setFoto(FotoPersonaDTO foto) {
        this.foto = foto;
    }

    public MoscatiUserDTO getAutor() {
        return autor;
    }

    public void setAutor(MoscatiUserDTO autor) {
        this.autor = autor;
    }
}
