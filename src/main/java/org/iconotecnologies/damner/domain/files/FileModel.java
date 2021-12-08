package org.iconotecnologies.damner.domain.files;

import java.util.Arrays;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import org.hibernate.annotations.GenericGenerator;

@MappedSuperclass
public class FileModel {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private String id;

    private byte[] archivo;

    private String nombre;

    @Column(name = "TIPO")
    private String archivoContentType;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public byte[] getArchivo() {
        return archivo;
    }

    public void setArchivo(byte[] archivo) {
        this.archivo = archivo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getArchivoContentType() {
        return archivoContentType;
    }

    public void setArchivoContentType(String archivoContentType) {
        this.archivoContentType = archivoContentType;
    }

    @Override
    public String toString() {
        return (
            "PhotoUserAlbumModel{" +
            "id='" +
            id +
            '\'' +
            ", nombre='" +
            nombre +
            '\'' +
            ", archivoContentType='" +
            archivoContentType +
            '\'' +
            '}'
        );
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FileModel)) return false;
        FileModel that = (FileModel) o;
        if (this.id == null || that.id == null) return false;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
