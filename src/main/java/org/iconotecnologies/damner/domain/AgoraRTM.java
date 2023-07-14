package org.iconotecnologies.damner.domain;

public class AgoraRTM {

    public static String appId = "859951576d59444e9fe1831a74a9c1a3";
    public static String appCertificate = "d53fad321b804232bd9310c8398cd1bb";
    private String userId;
    private int expirationTimeInSeconds = 0;
    private String token;
    private String channelName;

    public static String getAppId() {
        return appId;
    }

    public static void setAppId(String appId) {
        AgoraRTM.appId = appId;
    }

    public static String getAppCertificate() {
        return appCertificate;
    }

    public static void setAppCertificate(String appCertificate) {
        AgoraRTM.appCertificate = appCertificate;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getExpirationTimeInSeconds() {
        return expirationTimeInSeconds;
    }

    public void setExpirationTimeInSeconds(int expirationTimeInSeconds) {
        this.expirationTimeInSeconds = expirationTimeInSeconds;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getChannelName() {
        return channelName;
    }

    public void setChannelName(String channelName) {
        this.channelName = channelName;
    }
}
