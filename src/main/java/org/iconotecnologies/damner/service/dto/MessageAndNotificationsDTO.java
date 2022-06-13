package org.iconotecnologies.damner.service.dto;

import java.io.Serializable;
import java.util.Objects;

public class MessageAndNotificationsDTO implements Serializable {

    private Integer notificationsNum;
    private Integer messagesNum;

    public Integer getNotificationsNum() {
        return notificationsNum;
    }

    public void setNotificationsNum(Integer notificationsNum) {
        this.notificationsNum = notificationsNum;
    }

    public Integer getMessagesNum() {
        return messagesNum;
    }

    public void setMessagesNum(Integer messagesNum) {
        this.messagesNum = messagesNum;
    }

    @Override
    public String toString() {
        return "MessageAndNotificationsDTO{" + "notificationsNum=" + notificationsNum + ", messagesNum=" + messagesNum + '}';
    }
}
