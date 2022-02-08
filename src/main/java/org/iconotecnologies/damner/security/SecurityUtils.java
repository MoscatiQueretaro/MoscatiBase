package org.iconotecnologies.damner.security;

import java.io.Serializable;
import java.util.Optional;
import java.util.stream.Stream;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * Utility class for Spring Security.
 */
public final class SecurityUtils {

    private SecurityUtils() {}

    /**
     * Get the login of the current DamnerUserDetails.
     *
     * @return the login of the current DamnerUserDetails.
     */
    //    public static Optional<String> getCurrentUserLogin() {
    //        SecurityContext securityContext = SecurityContextHolder.getContext();
    //        return Optional.ofNullable(extractPrincipal(securityContext.getAuthentication()));
    //    }

    public static Optional<org.iconotecnologies.damner.domain.DamnerUserDetails> getCurrentUserLogin() {
        SecurityContext securityContext = SecurityContextHolder.getContext();

        return Optional
            .ofNullable(securityContext.getAuthentication())
            .map(
                authentication -> {
                    if (authentication.getPrincipal() instanceof org.iconotecnologies.damner.domain.DamnerUserDetails) {
                        return (org.iconotecnologies.damner.domain.DamnerUserDetails) authentication.getPrincipal();
                    } else if (authentication.getPrincipal() instanceof String) {
                        return (org.iconotecnologies.damner.domain.DamnerUserDetails) authentication.getPrincipal();
                    }
                    return null;
                }
            );
    }

    public static Optional<Serializable> getCurrentUserId() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        return Optional
            .ofNullable(securityContext.getAuthentication())
            .map(
                authentication -> {
                    if (authentication.getPrincipal() instanceof org.iconotecnologies.damner.domain.DamnerUserDetails) {
                        org.iconotecnologies.damner.domain.DamnerUserDetails springSecurityUser = (org.iconotecnologies.damner.domain.DamnerUserDetails) authentication.getPrincipal();
                        return springSecurityUser.getId();
                    } else if (authentication.getPrincipal() instanceof String) {
                        return (String) authentication.getPrincipal();
                    }
                    return null;
                }
            );
    }

    public static boolean isCurrentUserInRole(String authority) {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        return Optional
            .ofNullable(securityContext.getAuthentication())
            .map(
                authentication ->
                    authentication.getAuthorities().stream().anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals(authority))
            )
            .orElse(false);
    }

    private static String extractPrincipal(Authentication authentication) {
        if (authentication == null) {
            return null;
        } else if (authentication.getPrincipal() instanceof org.iconotecnologies.damner.domain.DamnerUserDetails) {
            org.iconotecnologies.damner.domain.DamnerUserDetails springSecurityUser = (org.iconotecnologies.damner.domain.DamnerUserDetails) authentication.getPrincipal();
            return springSecurityUser.getUsername();
        } else if (authentication.getPrincipal() instanceof String) {
            return (String) authentication.getPrincipal();
        }
        return null;
    }

    /**
     * Get the JWT of the current user.
     *
     * @return the JWT of the current user.
     */
    public static Optional<String> getCurrentUserJWT() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        return Optional
            .ofNullable(securityContext.getAuthentication())
            .filter(authentication -> authentication.getCredentials() instanceof String)
            .map(authentication -> (String) authentication.getCredentials());
    }

    /**
     * Check if a user is authenticated.
     *
     * @return true if the user is authenticated, false otherwise.
     */
    public static boolean isAuthenticated() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null && getAuthorities(authentication).noneMatch(AuthoritiesConstants.ANONYMOUS::equals);
    }

    /**
     * Checks if the current user has a specific authority.
     *
     * @param authority the authority to check.
     * @return true if the current user has the authority, false otherwise.
     */
    public static boolean hasCurrentUserThisAuthority(String authority) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null && getAuthorities(authentication).anyMatch(authority::equals);
    }

    private static Stream<String> getAuthorities(Authentication authentication) {
        return authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority);
    }
}
