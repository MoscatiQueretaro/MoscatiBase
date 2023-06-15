package org.iconotecnologies.damner.service.criteria;

import org.iconotecnologies.damner.domain.MoscatiArticulos;
import org.iconotecnologies.damner.domain.MoscatiArticulos_;
import org.iconotecnologies.damner.domain.MoscatiUser_;
import org.iconotecnologies.damner.security.SecurityUtils;
import org.iconotecnologies.damner.service.specifications.AdvanceQueryService;
import org.springframework.data.jpa.domain.Specification;
import tech.jhipster.service.filter.StringFilter;

public class MoscatiArticulosCriteria extends AdvanceQueryService<MoscatiArticulos> {

    private StringFilter nombre;
    private StringFilter descripcion;
    private StringFilter autor;

    public StringFilter getNombre() {
        return nombre;
    }

    public void setNombre(StringFilter nombre) {
        this.nombre = nombre;
    }

    public StringFilter getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(StringFilter descripcion) {
        this.descripcion = descripcion;
    }

    public StringFilter getAutor() {
        return autor;
    }

    public void setAutor(StringFilter autor) {
        this.autor = autor;
    }

    public Specification<MoscatiArticulos> buildSpecification() {
        Specification<MoscatiArticulos> specification = this.roleSpecification();
        if (nombre != null) {
            specification = specification.or(buildStringSpecification(nombre, MoscatiArticulos_.nombre));
        }
        if (descripcion != null) {
            specification = specification.or(buildStringSpecification(descripcion, MoscatiArticulos_.descripcion));
        }
        return specification;
    }

    private Specification<MoscatiArticulos> roleSpecification() {
        Specification<MoscatiArticulos> specification = Specification.where(null);
        if (SecurityUtils.isCurrentUserInRole("ROLE_BENEVENTO")) {
            this.autor.setContains("BENEVENTO");
            // retorna consulta con filtros dependiendo de el rol de medico y diferentes especificaciones.

        }
        if (autor != null) {
            specification =
                specification.or(buildNestedReferringEntityStringSpecification(autor, MoscatiArticulos_.autor, MoscatiUser_.name));
        }
        return specification;
        //aqui se retornara consulta con filtros default
    }
}
