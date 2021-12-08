package org.iconotecnologies.damner.domain;

import java.util.Collection;
import java.util.stream.Collectors;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

public class DamnerUserDetails implements org.springframework.security.core.userdetails.UserDetails {

    private DamnerUser user;

    public DamnerUser getUser() {
        return user;
    }

    public void setUser(DamnerUser user) {
        this.user = user;
    }

    public DamnerUserDetails() {}

    public DamnerUserDetails(DamnerUser user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return user
            .getAuthorities()
            .stream()
            .map(authority -> new SimpleGrantedAuthority(authority.getName().toString()))
            .collect(Collectors.toList());
    }

    public Long getId() {
        return user.getId();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getNickName();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public DamnerUser getDamnerUserDetails() {
        return user;
    }
}
