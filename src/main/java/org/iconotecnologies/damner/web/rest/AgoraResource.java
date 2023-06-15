package org.iconotecnologies.damner.web.rest;

import io.micrometer.core.annotation.Timed;
import java.net.URISyntaxException;
import javax.ws.rs.core.Response;
import org.iconotecnologies.damner.domain.Agora;
import org.iconotecnologies.damner.domain.AgoraRTM;
import org.iconotecnologies.damner.security.SecurityUtils;
import org.iconotecnologies.damner.web.rest.agora.media.RtcTokenBuilder;
import org.iconotecnologies.damner.web.rest.agora.rtm.RtmTokenBuilder;
import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/agora")
public class AgoraResource {

    @PostMapping("/rtc")
    @Timed
    public ResponseEntity<Agora> getRTCToken(@RequestBody Agora agora) throws URISyntaxException {
        RtcTokenBuilder token = new RtcTokenBuilder();
        String channelName = agora.getChannelName();
        int expireTime = agora.getExpirationTimeInSeconds();
        RtcTokenBuilder.Role role = RtcTokenBuilder.Role.Role_Subscriber;
        int uid = agora.getUid();

        // check for null channelName
        if (channelName == null) {
            // message error
        }

        if (expireTime == 0) {
            expireTime = 5400;
        }

        if (agora.getRole() == 1) {
            role = RtcTokenBuilder.Role.Role_Publisher;
        } else if (agora.getRole() == 0) {
            role = RtcTokenBuilder.Role.Role_Attendee;
        }

        int timestamp = (int) (System.currentTimeMillis() / 1000 + expireTime);

        String result = token.buildTokenWithUid(agora.appId, agora.appCertificate, channelName, uid, role, timestamp);

        if (result != null && result != "") {
            agora.setToken(result);
        }
        System.out.print("Agora token[" + result + "]fin");

        return ResponseEntity.ok(agora);
    }

    @PostMapping("/rtm")
    @Timed
    public ResponseEntity<AgoraRTM> getRTMToken(@RequestBody AgoraRTM agoraRTM) throws Exception {
        String userId = SecurityUtils.getCurrentUserLogin().map(user -> user.getUsername()).orElse(null);

        if (userId == null) {
            JSONObject error = new JSONObject();
            error.put("error", "User ID cannot be blank");
        }

        RtmTokenBuilder token = new RtmTokenBuilder();
        String result = token.buildToken(agoraRTM.appId, agoraRTM.appCertificate, userId, RtmTokenBuilder.Role.Rtm_User, 0);

        if (result != null && result != "") {
            agoraRTM.setToken(result);
            agoraRTM.setUserId(userId);
        }
        System.out.print("Agora RTM token[" + result + "]fin");

        return ResponseEntity.ok(agoraRTM);
    }
}
