package org.iconotecnologies.damner.service.dto;

import java.io.Serializable;
import java.time.ZonedDateTime;
import org.iconotecnologies.damner.domain.MoscatiTipoPromocion;
import org.iconotecnologies.damner.domain.MoscatiUser;
import org.iconotecnologies.damner.service.dto.files.FotoPersonaDTO;

public class MoscatiPromocionesDTO implements Serializable {

    private Integer id;
    private String nombre;
    private Integer precio;
    private Integer descuento;
    private String descripcion;
    private FotoPersonaDTO foto;
    private ZonedDateTime vigencia;
    private MoscatiUserDTO autor;
    private MoscatiTipoPromocionDTO tipo;

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

    public Integer getPrecio() {
        return precio;
    }

    public void setPrecio(Integer precio) {
        this.precio = precio;
    }

    public Integer getDescuento() {
        return descuento;
    }

    public void setDescuento(Integer descuento) {
        this.descuento = descuento;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public FotoPersonaDTO getFoto() {
        return foto;
    }

    public void setFoto(FotoPersonaDTO foto) {
        this.foto = foto;
    }

    public ZonedDateTime getVigencia() {
        return vigencia;
    }

    public void setVigencia(ZonedDateTime vigencia) {
        this.vigencia = vigencia;
    }

    public MoscatiUserDTO getAutor() {
        return autor;
    }

    public void setAutor(MoscatiUserDTO autor) {
        this.autor = autor;
    }

    public MoscatiTipoPromocionDTO getTipo() {
        return tipo;
    }

    public void setTipo(MoscatiTipoPromocionDTO tipo) {
        this.tipo = tipo;
    }
}
