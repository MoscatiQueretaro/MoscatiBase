package org.iconotecnologies.damner.service.dto;

import java.io.Serializable;

public class MoscatiPagosStripeDTO implements Serializable {

    protected Integer id;
    private String stripeIntentId;
    private String stripeKey;
    private Integer stripeTotal;
    private String stripeDescripcion;
    private MoscatiStripeEtapaDTO etapa;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getStripeIntentId() {
        return stripeIntentId;
    }

    public void setStripeIntentId(String stripeIntentId) {
        this.stripeIntentId = stripeIntentId;
    }

    public String getStripeKey() {
        return stripeKey;
    }

    public void setStripeKey(String stripeKey) {
        this.stripeKey = stripeKey;
    }

    public Integer getStripeTotal() {
        return stripeTotal;
    }

    public void setStripeTotal(Integer stripeTotal) {
        this.stripeTotal = stripeTotal;
    }

    public String getStripeDescripcion() {
        return stripeDescripcion;
    }

    public void setStripeDescripcion(String stripeDescripcion) {
        this.stripeDescripcion = stripeDescripcion;
    }

    public MoscatiStripeEtapaDTO getEtapa() {
        return etapa;
    }

    public void setEtapa(MoscatiStripeEtapaDTO etapa) {
        this.etapa = etapa;
    }
}
