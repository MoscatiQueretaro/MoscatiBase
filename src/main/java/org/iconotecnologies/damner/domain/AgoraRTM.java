package org.iconotecnologies.damner.domain;

public class AgoraRTM {

    private static String appId = "d9f3bff461c34f31b21050001ee3dd48";
    private static String appCertificate = "3356278bc9cf42ff82063eabc308675a";
    private String userId;
    private int expireTimestamp = 0;

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

    public int getExpireTimestamp() {
        return expireTimestamp;
    }

    public void setExpireTimestamp(int expireTimestamp) {
        this.expireTimestamp = expireTimestamp;
    }
}
