package org.iconotecnologies.damner.service.criteria;

import org.iconotecnologies.damner.domain.MoscatiDirectorioMedico;
import org.iconotecnologies.damner.domain.MoscatiDirectorioMedico_;
import org.iconotecnologies.damner.domain.catalogos.MoscatiEspecialidades_;
import org.iconotecnologies.damner.service.specifications.AdvanceQueryService;
import org.springframework.data.jpa.domain.Specification;
import tech.jhipster.service.filter.StringFilter;

public class MoscatiDirectorioMedicoCriteria extends AdvanceQueryService<MoscatiDirectorioMedico> {

    private StringFilter especialidad;

    public StringFilter getEspecialidad() {
        return especialidad;
    }

    public void setEspecialidad(StringFilter especialidad) {
        this.especialidad = especialidad;
    }

    public Specification<MoscatiDirectorioMedico> buildSpecification() {
        Specification<MoscatiDirectorioMedico> specification = Specification.where(null);
        if (especialidad != null) {
            specification =
                specification.and(
                    buildNestedReferringEntityStringSpecification(
                        especialidad,
                        MoscatiDirectorioMedico_.especialidad,
                        MoscatiEspecialidades_.descripcion
                    )
                );
        }
        return specification;
    }
}
