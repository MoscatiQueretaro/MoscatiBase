package org.iconotecnologies.damner.service.criteria.catalogos;

import org.iconotecnologies.damner.domain.MoscatiDirectorioMedico;
import org.iconotecnologies.damner.domain.catalogos.MoscatiEtapaCita;
import org.iconotecnologies.damner.domain.catalogos.MoscatiEtapaCita_;
import org.iconotecnologies.damner.service.specifications.AdvanceQueryService;
import org.springframework.data.jpa.domain.Specification;
import tech.jhipster.service.filter.StringFilter;

public class MoscatiEtapaCitaCriteria extends AdvanceQueryService<MoscatiEtapaCita> {

    private StringFilter descripcion;
    private StringFilter estatus;

    public StringFilter getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(StringFilter descripcion) {
        this.descripcion = descripcion;
    }

    public StringFilter getEstatus() {
        return estatus;
    }

    public void setEstatus(StringFilter estatus) {
        this.estatus = estatus;
    }

    public Specification<MoscatiEtapaCita> buildSpecification() {
        Specification<MoscatiEtapaCita> specification = Specification.where(null);
        if (descripcion != null) {
            specification = specification.and(buildStringSpecification(descripcion, MoscatiEtapaCita_.descripcion));
        }
        if (estatus != null) {
            specification = specification.and(buildStringSpecification(estatus, MoscatiEtapaCita_.estatus));
        }
        return specification;
    }
}
