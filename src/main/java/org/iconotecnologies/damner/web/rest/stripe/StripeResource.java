package org.iconotecnologies.damner.web.rest.stripe;

import com.google.firebase.messaging.FirebaseMessagingException;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import io.micrometer.core.annotation.Timed;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.UnknownHostException;
import java.util.Optional;
import org.iconotecnologies.damner.domain.MoscatiUserCitas;
import org.iconotecnologies.damner.service.StripeService;
import org.iconotecnologies.damner.service.dto.MoscatiUserCitasDTO;
import org.iconotecnologies.damner.service.dto.StripeResponseDTO;
import org.iconotecnologies.damner.service.dto.stripeDTO;
import org.iconotecnologies.damner.web.rest.errors.BadRequestAlertException;
import org.iconotecnologies.damner.web.rest.util.HeaderUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tech.jhipster.web.util.ResponseUtil;

@RestController
@RequestMapping("/api/stripe")
public class StripeResource {

    private StripeService stripeService;

    public StripeResource(StripeService stripeService) {
        this.stripeService = stripeService;
    }

    @PostMapping("/create-checkout-session")
    @Timed
    public ResponseEntity<StripeResponseDTO> create(@RequestBody stripeDTO price)
        throws URISyntaxException, FirebaseMessagingException, StripeException, UnknownHostException {
        StripeResponseDTO dto = this.stripeService.stripeBuy(price);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(dto));
    }
}
