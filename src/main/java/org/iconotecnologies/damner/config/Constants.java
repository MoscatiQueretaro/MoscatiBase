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
    public static final String DEFAULT_ACTIVATION_STATUS = "NO";
    public static final String DEFAULT_USER_ROL = "USER";

    private Constants() {}
}
