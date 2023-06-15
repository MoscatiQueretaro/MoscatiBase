package org.iconotecnologies.damner.domain;

import java.io.Serializable;

public class Mensaje implements Serializable {

    private String sender;
    private String content;

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return "Mensaje{" + "sender='" + sender + '\'' + ", content='" + content + '\'' + '}';
    }
}
