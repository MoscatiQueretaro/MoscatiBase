package org.iconotecnologies.damner.web.rest;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.micrometer.core.annotation.Timed;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import org.iconotecnologies.damner.security.jwt.JWTFilter;
import org.iconotecnologies.damner.security.jwt.TokenProvider;
import org.iconotecnologies.damner.web.rest.vm.LoginVM;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

/**
 * Controller to authenticate users.
 */
@RestController
@RequestMapping("/api")
public class UserJWTController {

    private final TokenProvider tokenProvider;

    private final AuthenticationManager authenticationManager;

    public UserJWTController(TokenProvider tokenProvider, AuthenticationManager authenticationManager) {
        this.tokenProvider = tokenProvider;
        this.authenticationManager = authenticationManager;
    }

    //    @GetMapping("/token")
    //    @ResponseBody
    //    public ResponseEntity authByToken(@RequestParam("t") String tokenStr, HttpServletResponse response) {
    //        System.out.println(tokenStr);
    //        if(!tokenStr.isEmpty()){
    //            UserToken token = userTokenRepository.findFirstById(tokenStr);
    //            if(token != null){
    //                Persona persona = personaRepository.findFirstById(token.getCurp());
    //                Usuario usuario = usuarioRepository.findOneById(token.getCurp());
    //                if(persona != null && usuario != null){
    //                    LoginVM loginVM = new LoginVM();
    //                    loginVM.setUsername(usuario.getUsername());
    //                    loginVM.setPassword(usuario.getPasswordDecrypt().trim());
    //                    return this.login(loginVM,response);
    //                }
    //                return ResponseUtil.badRequest("No existe la persona",null,400002);
    //            }
    //            return ResponseUtil.badRequest("No Existe el token",null,400003);
    //        }
    //        return ResponseUtil.badRequest("No hay token",null,400004);
    //    }

    @PostMapping("/authenticate")
    @Timed
    public ResponseEntity authorize(@Valid @RequestBody LoginVM loginVM, HttpServletResponse response) {
        return this.login(loginVM, response);
    }

    private ResponseEntity login(LoginVM loginVM, HttpServletResponse response) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
            loginVM.getUsername(),
            loginVM.getPassword()
        );

        Authentication authentication = this.authenticationManager.authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        boolean rememberMe = (loginVM.isRememberMe() == null) ? false : loginVM.isRememberMe();
        String jwt = tokenProvider.createToken(authentication, rememberMe);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JWTFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);
        return new ResponseEntity<>(new JWTToken(jwt), httpHeaders, HttpStatus.OK);
    }

    /**
     * Object to return as body in JWT Authentication.
     */
    static class JWTToken {

        private String idToken;

        JWTToken(String idToken) {
            this.idToken = idToken;
        }

        @JsonProperty("id_token")
        String getIdToken() {
            return idToken;
        }

        void setIdToken(String idToken) {
            this.idToken = idToken;
        }
    }
}
