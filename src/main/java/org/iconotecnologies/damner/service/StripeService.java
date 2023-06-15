package org.iconotecnologies.damner.service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.Product;
import com.stripe.model.checkout.Session;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.ProductCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import java.net.UnknownHostException;
import java.util.Random;
import org.apache.tomcat.util.bcel.Const;
import org.iconotecnologies.damner.config.Constants;
import org.iconotecnologies.damner.service.dto.MoscatiPagosStripeDTO;
import org.iconotecnologies.damner.service.dto.MoscatiStripeEtapaDTO;
import org.iconotecnologies.damner.service.dto.StripeResponseDTO;
import org.iconotecnologies.damner.service.dto.stripeDTO;
import org.springframework.stereotype.Service;

@Service
public class StripeService {

    private final MoscatiPagosStripeService moscatiPagosStripeService;
    private final MoscatiStripeEtapaService moscatiStripeEtapaService;

    public StripeService(MoscatiPagosStripeService moscatiPagosStripeService, MoscatiStripeEtapaService moscatiStripeEtapaService) {
        this.moscatiPagosStripeService = moscatiPagosStripeService;
        this.moscatiStripeEtapaService = moscatiStripeEtapaService;
    }

    public MoscatiPagosStripeDTO stripeBuyPaymentIntent(stripeDTO payment) throws StripeException, UnknownHostException {
        Stripe.apiKey = Constants.STRIPE_API_KEY;
        String keyStripeId = generateStripeKey();
        MoscatiPagosStripeDTO moscatiPagosStripeDto = new MoscatiPagosStripeDTO();
        try {
            // crea un PaymentIntentCreateParams  con moneda, monto,image, descripcion, etc
            PaymentIntentCreateParams createParams = new PaymentIntentCreateParams.Builder()
                .setCurrency(payment.getCurrency())
                .setAmount(payment.getAmount())
                .setDescription("Cita Medica Virtual Hospital Moscati Queretaro")
                .addPaymentMethodType("card")
                .build();

            PaymentIntent paymentIntent = PaymentIntent.create(createParams);
            String clientSecret = paymentIntent.getClientSecret();

            MoscatiStripeEtapaDTO stripeEtapaDTO =
                this.moscatiStripeEtapaService.findOneEtapaByDescripcion(Constants.ETAPA_STRIPE_SOLICITUD);
            moscatiPagosStripeDto.setEtapa(stripeEtapaDTO);
            moscatiPagosStripeDto.setStripeKey(keyStripeId);
            moscatiPagosStripeDto.setStripeIntentId(paymentIntent.getId());
            moscatiPagosStripeDto.setClientSecret(clientSecret);
            moscatiPagosStripeDto.setStripeDescripcion(paymentIntent.getDescription());
            moscatiPagosStripeDto.setStripeTotal(130000);
            this.moscatiPagosStripeService.save(moscatiPagosStripeDto);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return moscatiPagosStripeDto;
    }

    public MoscatiPagosStripeDTO stripeBuy(stripeDTO payment) throws StripeException, UnknownHostException {
        String hostAddress = "localhost";
        // This is your test secret API key.
        Stripe.apiKey = Constants.STRIPE_API_KEY;
        String keyStripeId = generateStripeKey();
        MoscatiPagosStripeDTO moscatiPagosStripeDto = new MoscatiPagosStripeDTO();
        try {
            SessionCreateParams params = SessionCreateParams
                .builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(payment.getSuccessUrl() + "&keyStripeId=" + keyStripeId)
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
                                .setProductData(
                                    SessionCreateParams.LineItem.PriceData.ProductData
                                        .builder()
                                        .setName(payment.getName())
                                        .addImage(Constants.stripeImage)
                                        .build()
                                )
                                .build()
                        )
                        .build()
                )
                .build();

            // Create a stripe session
            Session session = Session.create(params);

            MoscatiStripeEtapaDTO stripeEtapaDTO =
                this.moscatiStripeEtapaService.findOneEtapaByDescripcion(Constants.ETAPA_STRIPE_SOLICITUD);
            moscatiPagosStripeDto.setEtapa(stripeEtapaDTO);
            moscatiPagosStripeDto.setStripeKey(keyStripeId);
            moscatiPagosStripeDto.setStripeIntentId(session.getId());
            moscatiPagosStripeDto.setStripeDescripcion(payment.getName());
            moscatiPagosStripeDto.setStripeTotal(payment.getAmount().intValue() / 100);
            this.moscatiPagosStripeService.save(moscatiPagosStripeDto);
        } catch (StripeException e) {
            System.out.println("Error: " + e.getMessage());
        }

        return moscatiPagosStripeDto;
    }

    protected String generateStripeKey() {
        String SALTCHARS = Constants.RANDOM_CHAR;
        StringBuilder salt = new StringBuilder();
        Random rnd = new Random();
        while (salt.length() < 18) { // length of the random string.
            int index = (int) (rnd.nextFloat() * SALTCHARS.length());
            salt.append(SALTCHARS.charAt(index));
        }
        String saltStr = salt.toString();
        return saltStr;
    }
}
