package org.iconotecnologies.damner.domain;

public class AgoraRTM {

    public static String appId = "d9f3bff461c34f31b21050001ee3dd48";
    public static String appCertificate = "3356278bc9cf42ff82063eabc308675a";
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
