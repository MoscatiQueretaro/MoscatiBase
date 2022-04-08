package org.iconotecnologies.damner.service.criteria;

import org.iconotecnologies.damner.domain.MoscatiUserCitas;
import org.iconotecnologies.damner.domain.MoscatiUserCitas_;
import org.iconotecnologies.damner.domain.MoscatiUser_;
import org.iconotecnologies.damner.domain.catalogos.MoscatiEtapaCita_;
import org.iconotecnologies.damner.domain.catalogos.MoscatiTipoCita_;
import org.iconotecnologies.damner.service.specifications.AdvanceQueryService;
import org.springframework.data.jpa.domain.Specification;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

public class MoscatiUserCitasCriteria extends AdvanceQueryService<MoscatiUserCitas> {

    private StringFilter etapaCita;
    private LongFilter doctor;
    private LongFilter user;
    private StringFilter tipoCita;

    public StringFilter getEtapaCita() {
        return etapaCita;
    }

    public void setEtapaCita(StringFilter etapaCita) {
        this.etapaCita = etapaCita;
    }

    public LongFilter getDoctor() {
        return doctor;
    }

    public void setDoctor(LongFilter doctor) {
        this.doctor = doctor;
    }

    public LongFilter getUser() {
        return user;
    }

    public void setUser(LongFilter user) {
        this.user = user;
    }

    public StringFilter getTipoCita() {
        return tipoCita;
    }

    public void setTipoCita(StringFilter tipoCita) {
        this.tipoCita = tipoCita;
    }

    public Specification<MoscatiUserCitas> buildSpecification() {
        Specification<MoscatiUserCitas> specification = Specification.where(null);
        if (etapaCita != null) {
            specification =
                specification.and(
                    buildNestedReferringEntitySpecification(etapaCita, MoscatiUserCitas_.etapaCita, MoscatiEtapaCita_.descripcion)
                );
        }
        if (doctor != null) {
            specification = specification.and(buildNestedReferringEntitySpecification(doctor, MoscatiUserCitas_.doctor, MoscatiUser_.id));
        }
        if (user != null) {
            specification = specification.and(buildNestedReferringEntitySpecification(user, MoscatiUserCitas_.user, MoscatiUser_.id));
        }
        if (tipoCita != null) {
            specification =
                specification.and(
                    buildNestedReferringEntitySpecification(tipoCita, MoscatiUserCitas_.tipoCita, MoscatiTipoCita_.descripcion)
                );
        }
        return specification;
    }
}
