package org.iconotecnologies.damner.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.iconotecnologies.damner.domain.files.FotoPersona;

@Entity
@Table(name = "MOSCATI_ARTICULOS")
public class MoscatiArticulos implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "MOSCATI_NOMBRE")
    private String nombre;

    @Column(name = "MOSCATI_DESCRIPCION")
    private String descripcion;

    @Column(name = "MOSCATI_PRECIO")
    private Integer precio;

    @JoinColumn(name = "MOSCATI_FOTO_ID")
    @ManyToOne
    private FotoPersona foto;

    @JoinColumn(name = "MOSCATI_AUTOR_ID")
    @ManyToOne
    private MoscatiUser autor;

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

    public FotoPersona getFoto() {
        return foto;
    }

    public void setFoto(FotoPersona foto) {
        this.foto = foto;
    }

    public MoscatiUser getAutor() {
        return autor;
    }

    public void setAutor(MoscatiUser autor) {
        this.autor = autor;
    }
}
