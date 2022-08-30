package org.iconotecnologies.damner.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.iconotecnologies.damner.domain.catalogos.MoscatiAutor;

@Entity
@Table(name = "moscati_pagos_stripe")
public class MoscatiPagosStripe implements Serializable {

    public static final String ENTITY_NAME = "moscati-pagos-stripe";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Integer id;

    @Column(name = "stripe_intent_id")
    private String stripeIntentId;

    @Column(name = "stripe_key")
    private String stripeKey;

    @Column(name = "stripe_total")
    private Integer stripeTotal;

    @Column(name = "stripe_descripcion")
    private String stripeDescripcion;

    @JoinColumn(name = "stripe_etapa_id")
    @ManyToOne
    private MoscatiStripeEtapa etapa;

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

    public MoscatiStripeEtapa getEtapa() {
        return etapa;
    }

    public void setEtapa(MoscatiStripeEtapa etapa) {
        this.etapa = etapa;
    }
}
