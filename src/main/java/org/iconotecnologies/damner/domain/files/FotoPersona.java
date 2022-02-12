package org.iconotecnologies.damner.domain.files;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "MOSCATI_PHOTO_USER")
public class FotoPersona extends FileModel implements Serializable {

    private static final String ENTITY_NAME = "archivoFotoPersona";
}
