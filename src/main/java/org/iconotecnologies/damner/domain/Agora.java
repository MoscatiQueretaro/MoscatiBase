package org.iconotecnologies.damner.domain;

public class Agora {

    public static String appId = "d9f3bff461c34f31b21050001ee3dd48";
    public static String appCertificate = "3356278bc9cf42ff82063eabc308675a";
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
