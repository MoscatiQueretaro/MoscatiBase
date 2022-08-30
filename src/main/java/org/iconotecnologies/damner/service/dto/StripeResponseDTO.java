package org.iconotecnologies.damner.service.dto;

public class StripeResponseDTO {

    private String id;
    private String paymentIntent;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPaymentIntent() {
        return paymentIntent;
    }

    public void setPaymentIntent(String paymentIntent) {
        this.paymentIntent = paymentIntent;
    }
}
