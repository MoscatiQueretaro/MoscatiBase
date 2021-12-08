package org.iconotecnologies.damner.service.dto.files;

import java.util.Objects;

public class LightFileDTO {

    private String id;
    private String nombre;
    private String archivoContentType;

    public LightFileDTO(String id, String nombre, String archivoContentType) {
        this.id = id;
        this.nombre = nombre;
        this.archivoContentType = archivoContentType;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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
        return "LightFileDTO{" + "id='" + id + '\'' + ", nombre='" + nombre + '\'' + '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof LightFileDTO)) return false;
        LightFileDTO that = (LightFileDTO) o;
        if (this.id == null | that.id == null) return false;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
