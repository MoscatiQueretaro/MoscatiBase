package org.iconotecnologies.damner.service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import java.net.InetAddress;
import java.net.UnknownHostException;
import org.iconotecnologies.damner.config.Constants;
import org.iconotecnologies.damner.service.dto.StripeResponseDTO;
import org.iconotecnologies.damner.service.dto.stripeDTO;
import org.springframework.stereotype.Service;

@Service
public class StripeService {

    public StripeResponseDTO stripeBuy(stripeDTO payment) throws StripeException, UnknownHostException {
        String hostAddress = "localhost";
        // This is your test secret API key.
        Stripe.apiKey = Constants.STRIPE_API_KEY;
        SessionCreateParams params = SessionCreateParams
            .builder()
            // We will use the credit card payment method
            .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
            .setMode(SessionCreateParams.Mode.PAYMENT)
            .setSuccessUrl(payment.getSuccessUrl())
            .setCancelUrl(payment.getCancelUrl())
            .addLineItem(
                SessionCreateParams.LineItem
                    .builder()
                    .setQuantity(1L)
                    .setPriceData(
                        SessionCreateParams.LineItem.PriceData
                            .builder()
                            .setCurrency(payment.getCurrency())
                            .setUnitAmount(payment.getAmount())
                            .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder().setName(payment.getName()).build())
                            .build()
                    )
                    .build()
            )
            .build();
        // create a stripe session
        Session session = Session.create(params);
        StripeResponseDTO stripeResponseDTO = new StripeResponseDTO();
        stripeResponseDTO.setId(session.getId());

        return stripeResponseDTO;
    }
}
