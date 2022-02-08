package org.iconotecnologies.damner.service.specifications;

import java.text.Normalizer;
import java.time.LocalDate;
import java.util.Collection;
import java.util.function.Function;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Root;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import org.springframework.data.jpa.domain.Specification;
import tech.jhipster.service.QueryService;
import tech.jhipster.service.filter.Filter;
import tech.jhipster.service.filter.IntegerFilter;
import tech.jhipster.service.filter.StringFilter;

public class AdvanceQueryService<CLASS> extends QueryService<CLASS> {

    protected <X> Specification<CLASS> buildNestedReferringEntitySpecification(Filter<X> filter, SingularAttribute<?, ?>... relationships) {
        return this.buildSpecification(
                filter,
                root -> {
                    Path path = root;
                    for (SingularAttribute attribute : relationships) {
                        path = path.get(attribute);
                    }
                    return path;
                }
            );
    }

    protected <OTHER, X> Specification<CLASS> notEqualsSpecification(
        SingularAttribute<? super CLASS, OTHER> reference,
        SingularAttribute<OTHER, X> idField,
        X value
    ) {
        return (root, query, builder) -> builder.notEqual(root.get(reference).get(idField), value);
    }

    protected Specification<CLASS> byFieldSpecified(final boolean specified, SingularAttribute<?, ?>... fields) {
        return (root, query, builder) -> {
            Path<?> path = root;
            for (SingularAttribute attribute : fields) {
                path = path.get(attribute);
            }
            return (specified) ? builder.isNotNull(path) : builder.isNull(path);
        };
    }

    protected <X> Specification<CLASS> nestedEqualsSpecification(X value, SingularAttribute<?, ?>... relationships) {
        return (root, query, builder) -> {
            Path<?> path = root;
            for (SingularAttribute attribute : relationships) {
                path = path.get(attribute);
            }
            return builder.equal(path, value);
        };
    }

    protected <X> Specification<CLASS> nestedNotEqualsSpecification(X value, SingularAttribute<?, ?>... relationships) {
        return (root, query, builder) -> {
            Path<?> path = root;
            for (SingularAttribute attribute : relationships) {
                path = path.get(attribute);
            }
            return builder.notEqual(path, value);
        };
    }

    protected <X> Specification<CLASS> nestedValueIn(Collection<X> values, SingularAttribute<?, ?>... relationships) {
        return (root, query, builder) -> {
            Path<?> path = root;
            for (SingularAttribute attribute : relationships) {
                path = path.get(attribute);
            }
            CriteriaBuilder.In list = builder.in(path);
            for (X value : values) {
                list = list.value(value);
            }
            return list;
        };
    }

    //string specifications
    protected Specification<CLASS> buildNestedReferringEntityStringSpecification(
        StringFilter filter,
        SingularAttribute<?, ?>... relationships
    ) {
        Specification<CLASS> res = buildNestedReferringEntitySpecification(filter, relationships);
        if (res != null) return res;
        if (filter.getContains() != null) {
            return containsSpecification(filter.getContains(), relationships);
        }
        return null;
    }

    protected Specification<CLASS> buildNestedReferringEntityStringSpecification(
        StringFilter filter,
        Function<Root<CLASS>, Expression<String>> metaFunction
    ) {
        Specification<CLASS> res = this.buildSpecification(filter, metaFunction);
        if (res != null) return res;
        if (filter.getContains() != null) {
            return this.likeUpperSpecificationUnaccent(metaFunction, filter.getContains());
        }
        return null;
    }

    // only for Oracle DB's
    protected Specification<CLASS> buildNestedReferringEntityUnaccentStringSpecification(
        StringFilter filter,
        SingularAttribute<?, ?>... relationships
    ) {
        Specification<CLASS> res = buildNestedReferringEntitySpecification(filter, relationships);
        if (res != null) return res;
        if (filter.getContains() != null) {
            Function<Root<CLASS>, Expression<String>> metaclassFunction = root -> {
                Path<?> path = root;
                for (SingularAttribute attribute : relationships) {
                    path = path.get(attribute);
                }
                return path.as(String.class);
            };
            return this.likeUpperSpecificationUnaccent(metaclassFunction, filter.getContains());
        }
        return null;
    }

    // only for Oracle DB's
    protected Specification<CLASS> buildUnaccentStringSpecification(StringFilter filter, SingularAttribute<? super CLASS, String> field) {
        Function<Root<CLASS>, Expression<String>> metaclassFunction = root -> root.get(field);
        if (filter.getEquals() != null) {
            return this.equalsSpecification(metaclassFunction, filter.getEquals());
        } else if (filter.getIn() != null) {
            return this.valueIn(metaclassFunction, filter.getIn());
        } else if (filter.getContains() != null) {
            return this.likeUpperSpecificationUnaccent(metaclassFunction, filter.getContains());
        } else if (filter.getDoesNotContain() != null) {
            return this.doesNotContainSpecification(metaclassFunction, filter.getDoesNotContain());
        } else if (filter.getNotEquals() != null) {
            return this.notEqualsSpecification(metaclassFunction, filter.getNotEquals());
        } else {
            return filter.getSpecified() != null ? this.byFieldSpecified(metaclassFunction, filter.getSpecified()) : null;
        }
    }

    protected Specification<CLASS> containsSpecification(String value, SingularAttribute<?, ?>... relationships) {
        return (root, query, builder) -> {
            Path<?> path = root;
            for (SingularAttribute attribute : relationships) {
                path = path.get(attribute);
            }
            Path<String> pathString = (Path<String>) path;
            return builder.like(builder.upper(pathString), wrapText(value));
        };
    }

    protected Specification<CLASS> containsSpecification(String value, Function<Root<CLASS>, Expression<String>> metaFunction) {
        return (root, query, builder) -> builder.like(builder.upper(metaFunction.apply(root)), wrapText(value));
    }

    protected <OTHER> Specification<CLASS> lessThanOrEqualTo(
        SingularAttribute<? super CLASS, OTHER> reference,
        SingularAttribute<OTHER, LocalDate> idField,
        LocalDate value
    ) {
        return (root, query, builder) -> builder.lessThanOrEqualTo(root.get(reference).get(idField), value);
    }

    //list specifications
    private <OTHER, X> Specification<CLASS> buildReferringEtityListSpecification(
        IntegerFilter filter,
        SingularAttribute<? super CLASS, OTHER> reference,
        ListAttribute<OTHER, X> valueField
    ) {
        if (filter.getEquals() != null) return equalListSize(reference, valueField, filter.getEquals());
        if (filter.getGreaterThan() != null) return greaterThanListSize(reference, valueField, filter.getGreaterThan());
        return null;
    }

    private <OTHER, X> Specification<CLASS> equalListSize(
        SingularAttribute<? super CLASS, OTHER> reference,
        ListAttribute<OTHER, X> field,
        Integer value
    ) {
        return (root, query, builder) -> builder.equal(builder.size(root.get(reference).get(field)), value);
    }

    private <OTHER, X> Specification<CLASS> greaterThanListSize(
        SingularAttribute<? super CLASS, OTHER> reference,
        ListAttribute<OTHER, X> field,
        Integer value
    ) {
        return (root, query, builder) -> builder.greaterThan(builder.size(root.get(reference).get(field)), value);
    }

    //helper functions
    protected String wrapText(String txt) {
        return "%" + txt.toUpperCase() + '%';
    }

    protected Specification<CLASS> likeUpperSpecificationUnaccent(
        Function<Root<CLASS>, Expression<String>> metaclassFunction,
        String value
    ) {
        return (root, query, builder) ->
            builder.like(
                builder.upper(
                    builder.function(
                        "utl_raw.cast_to_varchar2",
                        String.class,
                        builder.function("nlssort", String.class, metaclassFunction.apply(root), builder.literal("nls_sort=binary_ai"))
                    )
                ),
                this.wrapLikeQuery(Normalizer.normalize(value, Normalizer.Form.NFD).replaceAll("[^\\p{ASCII}]", ""))
            );
    }
}
