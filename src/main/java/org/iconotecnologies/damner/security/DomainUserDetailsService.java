package org.iconotecnologies.damner.security;

import java.util.*;
import java.util.stream.Collectors;
import org.iconotecnologies.damner.domain.Authority;
import org.iconotecnologies.damner.domain.DamnerAuthorities;
import org.iconotecnologies.damner.domain.DamnerUser;
import org.iconotecnologies.damner.domain.DamnerUserRol;
import org.iconotecnologies.damner.repository.DamnerRolAuthoritiesRepository;
import org.iconotecnologies.damner.repository.DamnerUserRepository;
import org.iconotecnologies.damner.repository.DamnerUserRolRepository;
import org.iconotecnologies.damner.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Authenticate a user from the database.
 */
@Component("userDetailsService")
public class DomainUserDetailsService implements UserDetailsService {

    private final Logger log = LoggerFactory.getLogger(DomainUserDetailsService.class);

    private final UserRepository userRepository;
    private final DamnerUserRepository damnerUserRepository;
    private final DamnerUserRolRepository damnerUserRolRepository;
    private final DamnerRolAuthoritiesRepository damnerRolAuthoritiesRepository;

    public DomainUserDetailsService(
        UserRepository userRepository,
        DamnerUserRepository damnerUserRepository,
        DamnerUserRolRepository damnerUserRolRepository,
        DamnerRolAuthoritiesRepository damnerRolAuthoritiesRepository
    ) {
        this.userRepository = userRepository;
        this.damnerUserRepository = damnerUserRepository;
        this.damnerUserRolRepository = damnerUserRolRepository;
        this.damnerRolAuthoritiesRepository = damnerRolAuthoritiesRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String login) {
        log.debug("Authenticating {}", login);
        System.out.println(login);
        String lowercaseLogin = login;
        Optional<DamnerUser> userFromDatabase = damnerUserRepository.findOneByNickName(lowercaseLogin);
        return userFromDatabase
            .map(
                user -> {
                    if (user.getActivation().equals("NO")) {
                        throw new UserNotActivatedException("User " + lowercaseLogin + " was not activated");
                    }

                    DamnerUserRol roleUser = damnerUserRolRepository.findFirstByDamnerUserId(user.getId());
                    if (roleUser != null) {
                        user.setRole(roleUser.getDamnerRol().getNombre());
                        Set<Authority> authorities = damnerRolAuthoritiesRepository
                            .findAllByDamnerRol_Id(roleUser.getDamnerRol().getId())
                            .stream()
                            .map(
                                auth -> {
                                    DamnerAuthorities accion = auth.getDamnerAuthirities();
                                    Authority authority = new Authority();
                                    authority.setName("ROLE_" + accion.getAccion());
                                    log.debug(accion.toString());
                                    return authority;
                                }
                            )
                            .collect(Collectors.toSet());
                        user.setAuthorities(authorities);
                    } else {
                        throw new UsernameNotFoundException("User " + lowercaseLogin + " was not found in the " + "database");
                    }

                    return new org.iconotecnologies.damner.domain.DamnerUserDetails(user);
                }
            )
            .orElseThrow(() -> new UsernameNotFoundException("User " + lowercaseLogin + " was not found in the " + "database"));
    }
}
