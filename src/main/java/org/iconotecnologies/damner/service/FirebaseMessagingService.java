package org.iconotecnologies.damner.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import org.iconotecnologies.damner.domain.firebase.Note;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class FirebaseMessagingService {

    private final FirebaseMessaging firebaseMessaging;

    public FirebaseMessagingService(FirebaseMessaging firebaseMessaging) {
        this.firebaseMessaging = firebaseMessaging;
    }

    public String sendNotification(Note note, String token) throws FirebaseMessagingException {
        Notification notification = Notification
            .builder()
            .setImage(note.getImage())
            .setTitle(note.getSubject())
            .setBody(note.getContent())
            .build();

        Message message = Message.builder().setToken(token).setNotification(notification).putAllData(note.getData()).build();

        return firebaseMessaging.send(message);
    }
}
