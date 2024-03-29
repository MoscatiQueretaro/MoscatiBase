package org.iconotecnologies.damner.web.rest;

import io.micrometer.core.annotation.Timed;
import java.util.*;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import org.apache.commons.lang3.StringUtils;
import org.iconotecnologies.damner.domain.DamnerUserDetails;
import org.iconotecnologies.damner.domain.MoscatiUser;
import org.iconotecnologies.damner.domain.files.PhotoUserAlbum;
import org.iconotecnologies.damner.repository.MoscatiUserRepository;
import org.iconotecnologies.damner.repository.UserRepository;
import org.iconotecnologies.damner.security.SecurityUtils;
import org.iconotecnologies.damner.service.MailService;
import org.iconotecnologies.damner.service.UserService;
import org.iconotecnologies.damner.service.dto.MoscatiUserDTO;
import org.iconotecnologies.damner.service.dto.PasswordChangeDTO;
import org.iconotecnologies.damner.service.dto.files.PhotoUserAlbumDTO;
import org.iconotecnologies.damner.web.rest.errors.*;
import org.iconotecnologies.damner.web.rest.util.HeaderUtil;
import org.iconotecnologies.damner.web.rest.vm.ManagedUserVM;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing the current user's account.
 */
@RestController
@RequestMapping("/api")
public class AccountResource {

    private static class AccountResourceException extends RuntimeException {

        private AccountResourceException(String message) {
            super(message);
        }
    }

    private final Logger log = LoggerFactory.getLogger(AccountResource.class);

    private final UserRepository userRepository;
    private final MoscatiUserRepository moscatiUserRepository;

    private final UserService userService;

    private final MailService mailService;

    public AccountResource(
        UserRepository userRepository,
        MoscatiUserRepository moscatiUserRepository,
        UserService userService,
        MailService mailService
    ) {
        this.userRepository = userRepository;
        this.moscatiUserRepository = moscatiUserRepository;
        this.userService = userService;
        this.mailService = mailService;
    }

    //    /**
    //     * {@code POST  /register} : register the user.
    //     *
    //     * @param managedUserVM the managed user View Model.
    //     * @throws InvalidPasswordException {@code 400 (Bad Request)} if the password is incorrect.
    //     * @throws EmailAlreadyUsedException {@code 400 (Bad Request)} if the email is already used.
    //     * @throws LoginAlreadyUsedException {@code 400 (Bad Request)} if the login is already used.
    //     */
    //    @PostMapping("/register")
    //    @ResponseStatus(HttpStatus.CREATED)
    //    public void registerAccount(@RequestBody ManagedUserVM managedUserVM) {
    //        if (isPasswordLengthInvalid(managedUserVM.getPassword())) {
    //            throw new InvalidPasswordException();
    //        }
    //        User user = userService.registerUser(managedUserVM, managedUserVM.getPassword());
    //        mailService.sendActivationEmail(user);
    //    }

    @PostMapping("/register")
    @Timed
    public ResponseEntity<MoscatiUserDTO> create(@RequestBody MoscatiUserDTO moscatiUserDto) {
        moscatiUserDto.setEstatus("A");
        moscatiUserDto.setLanguage("es");
        System.out.println("Request-body:" + moscatiUserDto);
        if (moscatiUserDto.getId() != null) throw new BadRequestAlertException(
            "El nuevo medio de solicitud no puede tener id",
            MoscatiUser.ENTITY_NAME,
            "idNull"
        );
        MoscatiUserDTO newUser = userService.registerUser(moscatiUserDto);
        return ResponseEntity.ok(newUser);
    }

    /**
     * {@code GET  /activate} : activate the registered user.
     *
     * @param key the activation key.
     * @throws RuntimeException {@code 500 (Internal Server Error)} if the user couldn't be activated.
     */
    //    @GetMapping("/activate")
    //    public void activateAccount(@RequestParam(value = "key") String key) {
    //        Optional<User> user = userService.activateRegistration(key);
    //        if (!user.isPresent()) {
    //            throw new AccountResourceException("No user was found for this activation key");
    //        }
    //    }

    /**
     * {@code GET  /authenticate} : check if the user is authenticated, and return its login.
     *
     * @param request the HTTP request.
     * @return the login if the user is authenticated.
     */
    @GetMapping("/authenticate")
    public String isAuthenticated(HttpServletRequest request) {
        log.debug("REST request to check if the current user is authenticated");
        return request.getRemoteUser();
    }

    /**
     * {@code GET  /account} : get the current user.
     *
     * @return the current user.
     * @throws RuntimeException {@code 500 (Internal Server Error)} if the user couldn't be returned.
     */
    @GetMapping("/account")
    @Timed
    public ResponseEntity<MoscatiUserDTO> getAccount(HttpServletRequest request) {
        return Optional
            .ofNullable(userService.getUserWithAuthorities())
            .map(usuario -> new ResponseEntity<>(usuario, HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));
    }

    @GetMapping("/account/byuserid/{userId}")
    @Timed
    public ResponseEntity<MoscatiUserDTO> findAllByUserId(@PathVariable Long userId) {
        MoscatiUserDTO dto = this.userService.getUserById(userId);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(dto));
    }

    @GetMapping("/account/byNickname/{nickName}")
    @Timed
    public ResponseEntity<MoscatiUserDTO> findAllByNickName(@PathVariable String nickName) {
        MoscatiUserDTO dto = this.userService.getUserByNickName(nickName);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(dto));
    }

    /**
     * {@code POST  /account} : update the current user information.
     *
     * @param userDTO the current user information.
     * @throws EmailAlreadyUsedException {@code 400 (Bad Request)} if the email is already used.
     * @throws RuntimeException {@code 500 (Internal Server Error)} if the user login wasn't found.
     */
    @PostMapping("/account")
    public void saveAccount(@Valid @RequestBody MoscatiUserDTO userDTO) {
        DamnerUserDetails userLogin = SecurityUtils
            .getCurrentUserLogin()
            .orElseThrow(() -> new AccountResourceException("Current user login not found"));
        MoscatiUser existingUser = moscatiUserRepository.findFirstByMail(userDTO.getMail());
        if (existingUser != null) {
            throw new EmailAlreadyUsedException();
        }
        MoscatiUser user = moscatiUserRepository.findOneById(userLogin.getId()).orElse(null);
        if (user != null) {
            throw new AccountResourceException("User could not be found");
        }
        userService.updateUser(
            userDTO.getName(),
            userDTO.getFirstName(),
            userDTO.getLastName(),
            userDTO.getMail(),
            userDTO.getLanguage(),
            userDTO.getImageProfile()
        );
    }

    /**
     * {@code POST  /account/change-password} : changes the current user's password.
     *
     * @param passwordChangeDto current and new password.
     * @throws InvalidPasswordException {@code 400 (Bad Request)} if the new password is incorrect.
     */
    @PostMapping(path = "/account/change-password")
    public void changePassword(@RequestBody PasswordChangeDTO passwordChangeDto) {
        if (isPasswordLengthInvalid(passwordChangeDto.getNewPassword())) {
            throw new InvalidPasswordException();
        }
        userService.changePassword(passwordChangeDto.getCurrentPassword(), passwordChangeDto.getNewPassword());
    }

    /**
     * {@code POST  /account/update-photo-user} : changes the current user's image profile.
     *
     * @param photoUserAlbumDTO current and new image.
     * @throws BadRequestAlertException {@code 400 (Bad Request)} if the parameters incorrect.
     */
    @PostMapping("/account/update-photo-user")
    public ResponseEntity<PhotoUserAlbumDTO> updatePhotoUser(@Valid @RequestBody PhotoUserAlbumDTO photoUserAlbumDTO) {
        DamnerUserDetails userLogin = SecurityUtils
            .getCurrentUserLogin()
            .orElseThrow(() -> new BadRequestAlertException("ocurrio un error al revisar el inicio de sesion", "", ""));
        if (photoUserAlbumDTO.getFotoPersonaId() == null && photoUserAlbumDTO.getUserId() == null) {
            throw new BadRequestAlertException(
                "Surgio un error al cambiar la foto del perfil uno de los campos es null",
                PhotoUserAlbum.ENTITY_NAME,
                "error-to-change-photo"
            );
        }
        PhotoUserAlbumDTO photoUserAlbum;
        photoUserAlbum = this.userService.changePhotoProfile(photoUserAlbumDTO.getUserId(), photoUserAlbumDTO.getFotoPersonaId());
        return ResponseEntity.ok(photoUserAlbum);
    }

    //    @PostMapping(path = "/account/reset-password/init")
    //    public void requestPasswordReset(@RequestBody String mail) {
    //        Optional<User> user = userService.requestPasswordReset(mail);
    //        if (user.isPresent()) {
    //            mailService.sendPasswordResetMail(user.get());
    //        } else {
    //            // Pretend the request has been successful to prevent checking which emails really exist
    //            // but log that an invalid attempt has been made
    //            log.warn("Password reset requested for non existing mail");
    //        }
    //    }

    //    @PostMapping(path = "/account/reset-password/finish")
    //    public void finishPasswordReset(@RequestBody KeyAndPasswordVM keyAndPassword) {
    //        if (isPasswordLengthInvalid(keyAndPassword.getNewPassword())) {
    //            throw new InvalidPasswordException();
    //        }
    //        Optional<User> user = userService.completePasswordReset(keyAndPassword.getNewPassword(), keyAndPassword.getKey());
    //
    //        if (!user.isPresent()) {
    //            throw new AccountResourceException("No user was found for this reset key");
    //        }
    //    }

    private static boolean isPasswordLengthInvalid(String password) {
        return (
            StringUtils.isEmpty(password) ||
            password.length() < ManagedUserVM.PASSWORD_MIN_LENGTH ||
            password.length() > ManagedUserVM.PASSWORD_MAX_LENGTH
        );
    }
}
