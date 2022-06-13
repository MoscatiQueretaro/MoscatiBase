package org.iconotecnologies.damner.service.criteria;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Subquery;
import org.iconotecnologies.damner.domain.MoscatiPromociones;
import org.iconotecnologies.damner.domain.MoscatiPromociones_;
import org.iconotecnologies.damner.domain.catalogos.MoscatiAutor;
import org.iconotecnologies.damner.domain.catalogos.MoscatiAutor_;
import org.iconotecnologies.damner.security.SecurityUtils;
import org.iconotecnologies.damner.service.specifications.AdvanceQueryService;
import org.springframework.data.jpa.domain.Specification;
import tech.jhipster.service.filter.StringFilter;

public class MoscatiPromocionesCriteria extends AdvanceQueryService<MoscatiPromociones> {

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

    public Specification<MoscatiPromociones> buildSpecification() {
        Specification<MoscatiPromociones> specification = this.roleSpecification();
        if (nombre != null) {
            specification = specification.or(buildStringSpecification(nombre, MoscatiPromociones_.nombre));
        }
        if (descripcion != null) {
            specification = specification.or(buildStringSpecification(descripcion, MoscatiPromociones_.descripcion));
        }
        if (autor != null) {
            specification =
                specification.or(
                    buildNestedReferringEntityStringSpecification(autor, MoscatiPromociones_.autor, MoscatiAutor_.descripcion)
                );
        }

        return specification;
    }

    private Specification<MoscatiPromociones> roleSpecification() {
        if (SecurityUtils.isCurrentUserInRole("ROLE_MEDICO")) {
            return Specification.where(null);
            // retorna consulta con filtros dependiendo de el rol de medico y diferentes especificaciones.

        }
        if (SecurityUtils.isCurrentUserInRole("ROLE_USER")) {
            return Specification.where(null);
            // retorna consulta con filtros dependiendo de el rol de usuario y diferentes especificaciones.
        }
        return Specification.where(null);
        //aqui se retornara consulta con filtros default
    }

    private Specification<MoscatiPromociones> userSpecification() {
        return (root, query, builder) -> {
            Subquery<String> posts = query.subquery(String.class);
            return builder.equal(posts, "");
        };
    }

    private Specification<MoscatiPromociones> medicoSpecification() {
        return (root, query, builder) -> {
            Subquery<String> posts = query.subquery(String.class);
            return builder.equal(posts, "");
        };
    }

    private Specification<MoscatiPromociones> autorSpecification(StringFilter autor) {
        return (root, query, builder) -> {
            Subquery<MoscatiAutor> moscatiAutorSubquery = query.subquery(MoscatiAutor.class);
            Root<MoscatiPromociones> moscatiPromocionesRoot = moscatiAutorSubquery.from(MoscatiPromociones.class);
            moscatiAutorSubquery.select(moscatiPromocionesRoot.get(MoscatiPromociones_.autor));
            moscatiAutorSubquery.where(
                builder.like(moscatiPromocionesRoot.get(MoscatiPromociones_.autor).get(MoscatiAutor_.descripcion), autor.getEquals())
            );
            return builder.equal(root.get(MoscatiPromociones_.autor).get(MoscatiAutor_.descripcion), moscatiAutorSubquery);
        };
    }
    //    private Specification<Horario> jefeSpecification() {
    //        return (root, query, builder) -> {
    //            Subquery<Evaluacion> areaSub = query.subquery(Evaluacion.class);
    //            Root<AreaEvaluacion> evaluaciones = areaSub.from(AreaEvaluacion.class);
    //            areaSub.select( evaluaciones.get(AreaEvaluacion_.evaluacion) );
    //            areaSub.where(builder.equal(
    //                evaluaciones.get(AreaEvaluacion_.area).get(Area_.encargadoId).get(PersonalOperativo_.curpId), SecurityUtils.getCurrentUserId().get()
    //            ));
    //            CriteriaBuilder.In<Evaluacion> subIn = builder.in( root.get(Horario_.evaluacion) );
    //            return subIn.value(areaSub);
    //        };
    //    }
}
