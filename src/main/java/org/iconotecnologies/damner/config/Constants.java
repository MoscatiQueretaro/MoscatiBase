package org.iconotecnologies.damner.config;

/**
 * Application constants.
 */
public final class Constants {

    // Regex for acceptable logins
    public static final String LOGIN_REGEX = "^(?>[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*)|(?>[_.@A-Za-z0-9-]+)$";
    public static final String serialVersionUID = "1";
    public static final String SYSTEM = "system";
    public static final String DEFAULT_LANGUAGE = "es";
    public static final String DEFAULT_ACTIVATION_STATUS = "YES";
    public static final String DEFAULT_USER_ROL = "USER";
    public static final String DEFAULT_SOLICITUD_CITA_ES = "ah solicitado agendar una cita contigo el dia";
    public static final String DEFAULT_CITA_ES = "ah aceptado tu solicitud de cita para el día";
    public static final String DEFAULT_SOLICITUD_CITA_TITLE_ES = "SOLICITUD DE CITA";
    public static final String DEFAULT_CITA_TITLE_ES = "CONFIRMACIÓN DE CITA";
    public static final String ETAPA_SOLICITUD = "SOLICITUD";
    public static final String ETAPA_CITA = "CITA";

    private Constants() {}
}
