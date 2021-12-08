package org.iconotecnologies.damner;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import tech.jhipster.config.DefaultProfileUtil;

/**
 *     iCoNo Estuvo Aqui
 * ......   (\_/)
 * ......  ( '_')           coment error        \__/         \__/          \__/        \__/
 * ..../""""""""""""\======░ ▒▓▓█D *  *  *     (UwU)        (OoO)        0=_0=) !     (XnX)
 * /"""""""""""""""""""\                      //||\\       //||\\         //||\\     //||\\
 * \_@_@_@_@_@_@_@_@_@_/                       bug           bug            bug         bug
 *                                          trabajando    sorprendido      cagado     despues
 *
 */
public class ApplicationWebXml extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        // set a default to use when no profile is configured.
        DefaultProfileUtil.addDefaultProfile(application.application());
        return application.sources(DamnerApp.class);
    }
}
