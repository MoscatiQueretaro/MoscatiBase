package org.iconotecnologies.damner.security;

import java.io.Serializable;
import java.util.Optional;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

/**
 * Implementation of {@link AuditorAware} based on Spring Security.
 */
@Component
public class SpringSecurityAuditorAware implements AuditorAware<Serializable> {

    @Override
    public Optional<Serializable> getCurrentAuditor() {
        return Optional.of(SecurityUtils.getCurrentUserId().orElse("system"));
    }
}
