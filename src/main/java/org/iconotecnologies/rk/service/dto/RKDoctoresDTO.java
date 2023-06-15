package org.iconotecnologies.rk.service.dto;

import java.io.Serializable;

public class RKDoctoresDTO implements Serializable {

    protected Integer id;
    private String name;
    private String lastName;
    private String lastName2;
    private String professionalLicence;
    private String email;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getLastName2() {
        return lastName2;
    }

    public void setLastName2(String lastName2) {
        this.lastName2 = lastName2;
    }

    public String getProfessionalLicence() {
        return professionalLicence;
    }

    public void setProfessionalLicence(String professionalLicence) {
        this.professionalLicence = professionalLicence;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
