package org.iconotecnologies.damner.domain;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;
import javax.persistence.*;
import org.iconotecnologies.damner.domain.catalogos.MoscatiAutor;
import org.iconotecnologies.damner.domain.files.FotoPersona;

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
@Table(name = "moscati_promociones")
public class MoscatiPromociones implements Serializable {

    public static final String ENTITY_NAME = "moscati-promociones";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Integer id;

    @Column(name = "MOSCATI_NOMBRE")
    private String nombre;

    @Column(name = "MOSCATI_PRECIO")
    private Integer precio;

    @Column(name = "MOSCATI_Descuento")
    private Integer descuento;

    @Column(name = "MOSCATI_DESCRIPCION")
    private String descripcion;

    @JoinColumn(name = "MOSCATI_PHOTO_USER_ID")
    @ManyToOne
    private FotoPersona foto;

    @Column(name = "MOSCATI_VIGENCIA")
    private ZonedDateTime vigencia;

    @JoinColumn(name = "MOSCATI_AUTOR_ID")
    @ManyToOne
    private MoscatiUser autor;

    @JoinColumn(name = "MOSCATI_TIPO_PROMOCION_ID")
    @ManyToOne
    private MoscatiTipoPromocion tipo;

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

    public FotoPersona getFoto() {
        return foto;
    }

    public void setFoto(FotoPersona foto) {
        this.foto = foto;
    }

    public ZonedDateTime getVigencia() {
        return vigencia;
    }

    public void setVigencia(ZonedDateTime vigencia) {
        this.vigencia = vigencia;
    }

    public MoscatiUser getAutor() {
        return autor;
    }

    public void setAutor(MoscatiUser autor) {
        this.autor = autor;
    }

    public MoscatiTipoPromocion getTipo() {
        return tipo;
    }

    public void setTipo(MoscatiTipoPromocion tipo) {
        this.tipo = tipo;
    }

    @Override
    public String toString() {
        return (
            "MoscatiPromociones{" +
            "id=" +
            id +
            ", nombre='" +
            nombre +
            '\'' +
            ", precio=" +
            precio +
            ", descuento=" +
            descuento +
            ", descripcion='" +
            descripcion +
            '\'' +
            ", foto=" +
            foto +
            ", vigencia=" +
            vigencia +
            ", autor=" +
            autor +
            ", tipo=" +
            tipo +
            '}'
        );
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MoscatiPromociones that = (MoscatiPromociones) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(nombre, that.nombre) &&
            Objects.equals(precio, that.precio) &&
            Objects.equals(descuento, that.descuento) &&
            Objects.equals(descripcion, that.descripcion) &&
            Objects.equals(foto, that.foto) &&
            Objects.equals(vigencia, that.vigencia) &&
            Objects.equals(autor, that.autor) &&
            Objects.equals(tipo, that.tipo)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nombre, precio, descuento, descripcion, foto, vigencia, autor, tipo);
    }
}
