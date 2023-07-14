package org.iconotecnologies.damner.domain;

public class Agora {

    public static String appId = "859951576d59444e9fe1831a74a9c1a3";
    public static String appCertificate = "d53fad321b804232bd9310c8398cd1bb";
    private String channelName;
    private int uid = 0; // By default 0
    private int expirationTimeInSeconds = 5400; // By default 3600
    private int role = 1;
    private String token;

    public static String getAppId() {
        return appId;
    }

    public static void setAppId(String appId) {
        Agora.appId = appId;
    }

    public static String getAppCertificate() {
        return appCertificate;
    }

    public static void setAppCertificate(String appCertificate) {
        Agora.appCertificate = appCertificate;
    }

    public String getChannelName() {
        return channelName;
    }

    public void setChannelName(String channelName) {
        this.channelName = channelName;
    }

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public int getExpirationTimeInSeconds() {
        return expirationTimeInSeconds;
    }

    public void setExpirationTimeInSeconds(int expirationTimeInSeconds) {
        this.expirationTimeInSeconds = expirationTimeInSeconds;
    }

    public int getRole() {
        return role;
    }

    public void setRole(int role) {
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
