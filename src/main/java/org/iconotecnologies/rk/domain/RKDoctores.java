package org.iconotecnologies.rk.domain;

import java.io.Serializable;
import javax.persistence.*;

@Entity
@Table(name = "dbo.PR")
public class RKDoctores implements Serializable {

    public static final String ENTITY_NAME = "rkdoctores";

    @Id
    @Column(name = "PRNum")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Integer id;

    @Column(name = "Name")
    private String name;

    @Column(name = "LastName")
    private String lastName;

    @Column(name = "LastName2")
    private String lastName2;

    @Column(name = "Identification")
    private String professionalLicence;

    @Column(name = "EMail")
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
