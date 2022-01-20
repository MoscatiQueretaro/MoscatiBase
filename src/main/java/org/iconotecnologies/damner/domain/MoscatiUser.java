package org.iconotecnologies.damner.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.Size;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "moscati_user")
public class MoscatiUser extends AbstractAuditingEntity implements Serializable {

    public static final String ENTITY_NAME = "moscati-user-profile";

    @Transient
    private String role;

    @Transient
    private Set<Authority> authorities;

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "MOSCATI_NICKNAME")
    @Size(min = 1, max = 150)
    private String nickName;

    @Column(name = "MOSCATI_EMAIL")
    @Size(min = 1, max = 150)
    private String mail;

    @Column(name = "MOSCATI_PASSWORD")
    @Size(min = 1, max = 100)
    private String password;

    @Column(name = "MOSCATI_PASSWORD_KEY")
    @Size(min = 1, max = 100)
    private String passwordKey;

    @Column(name = "MOSCATI_THEME")
    private String theme;

    @Column(name = "MOSCATI_NAME")
    private String name;

    @Column(name = "MOSCATI_FIRST_NAME")
    private String firstName;

    @Column(name = "MOSCATI_LAST_NAME")
    private String lastName;

    @Column(name = "MOSCATI_LANGUAGE")
    private String language;

    @Column(name = "MOSCATI_IMAGE_PROFILE_ID")
    private String imageProfile;

    @Column(name = "MOSCATI_ACTIVATION_KEY", length = 36)
    @JsonIgnore
    private String activationKey;

    @Column(name = "MOSCATI_ACTIVATION", length = 3)
    @JsonIgnore
    private String activation;

    @Column(name = "MOSCATI_ESTATUS")
    private String estatus;

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Set<Authority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<Authority> authorities) {
        this.authorities = authorities;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPasswordKey() {
        return passwordKey;
    }

    public void setPasswordKey(String passwordKey) {
        this.passwordKey = passwordKey;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageProfile() {
        return imageProfile;
    }

    public void setImageProfile(String imageProfile) {
        this.imageProfile = imageProfile;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getEstatus() {
        return estatus;
    }

    public void setEstatus(String estatus) {
        this.estatus = estatus;
    }

    public String getActivationKey() {
        return activationKey;
    }

    public void setActivationKey(String activationKey) {
        this.activationKey = activationKey;
    }

    public String getActivation() {
        return activation;
    }

    public void setActivation(String activation) {
        this.activation = activation;
    }
}
