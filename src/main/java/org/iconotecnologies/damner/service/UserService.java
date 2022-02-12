package org.iconotecnologies.damner.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;
import org.iconotecnologies.damner.config.Constants;
import org.iconotecnologies.damner.domain.*;
import org.iconotecnologies.damner.repository.*;
import org.iconotecnologies.damner.security.SecurityUtils;
import org.iconotecnologies.damner.service.dto.AdminUserDTO;
import org.iconotecnologies.damner.service.dto.MoscatiUserDTO;
import org.iconotecnologies.damner.service.dto.UserDTO;
import org.iconotecnologies.damner.service.dto.files.FotoPersonaDTO;
import org.iconotecnologies.damner.service.dto.files.PhotoUserAlbumDTO;
import org.iconotecnologies.damner.service.files.FotoPersonaService;
import org.iconotecnologies.damner.service.files.PhotoUserAlbumService;
import org.iconotecnologies.damner.service.mapper.MoscatiUserMapper;
import org.iconotecnologies.damner.service.mapper.PhotoUserAlbumMapper;
import org.iconotecnologies.damner.service.mapper.files.FotoPersonaMapper;
import org.iconotecnologies.damner.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.security.RandomUtil;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class UserService {

    private final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthorityRepository authorityRepository;
    private final DamnerUserRolRepository damnerUserRolRepository;
    private final CacheManager cacheManager;
    private final MoscatiUserRepository moscatiUserRepository;
    private final MoscatiUserMapper moscatiUserMapper;
    private final DamnerRolRepository damnerRolRepository;
    private final DamnerRolAuthoritiesRepository damnerRolAuthoritiesRepository;
    private final PhotoUserAlbumService photoUserAlbumService;
    private final PhotoUserAlbumMapper photoUserAlbumMapper;
    private final FotoPersonaService fotoPersonaService;
    private final FotoPersonaMapper fotoPersonaMapper;

    public UserService(
        UserRepository userRepository,
        PasswordEncoder passwordEncoder,
        AuthorityRepository authorityRepository,
        DamnerUserRolRepository damnerUserRolRepository,
        CacheManager cacheManager,
        MoscatiUserRepository moscatiUserRepository,
        MoscatiUserMapper moscatiUserMapper,
        DamnerRolRepository damnerRolRepository,
        DamnerRolAuthoritiesRepository damnerRolAuthoritiesRepository,
        PhotoUserAlbumService photoUserAlbumService,
        PhotoUserAlbumMapper photoUserAlbumMapper,
        FotoPersonaService fotoPersonaService,
        FotoPersonaMapper fotoPersonaMapper
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityRepository = authorityRepository;
        this.damnerUserRolRepository = damnerUserRolRepository;
        this.cacheManager = cacheManager;
        this.moscatiUserRepository = moscatiUserRepository;
        this.moscatiUserMapper = moscatiUserMapper;
        this.damnerRolRepository = damnerRolRepository;
        this.damnerRolAuthoritiesRepository = damnerRolAuthoritiesRepository;
        this.photoUserAlbumService = photoUserAlbumService;
        this.photoUserAlbumMapper = photoUserAlbumMapper;
        this.fotoPersonaService = fotoPersonaService;
        this.fotoPersonaMapper = fotoPersonaMapper;
    }

    //    public Optional<User> activateRegistration(String key) {
    //        log.debug("Activating user for activation key {}", key);
    //        return userRepository
    //            .findOneByActivationKey(key)
    //            .map(
    //                user -> {
    //                    // activate given user for the registration key.
    //                    user.setActivated(true);
    //                    user.setActivationKey(null);
    //                    this.clearUserCaches(user);
    //                    log.debug("Activated user: {}", user);
    //                    return user;
    //                }
    //            );
    //    }

    //    public Optional<User> completePasswordReset(String newPassword, String key) {
    //        log.debug("Reset user password for reset key {}", key);
    //        return userRepository
    //            .findOneByResetKey(key)
    //            .filter(user -> user.getResetDate().isAfter(Instant.now().minusSeconds(86400)))
    //            .map(
    //                user -> {
    //                    user.setPassword(passwordEncoder.encode(newPassword));
    //                    user.setResetKey(null);
    //                    user.setResetDate(null);
    //                    this.clearUserCaches(user);
    //                    return user;
    //                }
    //            );
    //    }
    //
    //    public Optional<User> requestPasswordReset(String mail) {
    //        return userRepository
    //            .findOneByEmailIgnoreCase(mail)
    //            .filter(User::isActivated)
    //            .map(
    //                user -> {
    //                    user.setResetKey(RandomUtil.generateResetKey());
    //                    user.setResetDate(Instant.now());
    //                    this.clearUserCaches(user);
    //                    return user;
    //                }
    //            );
    //    }

    @Transactional
    public MoscatiUserDTO registerUser(MoscatiUserDTO moscatiUserDTO) {
        MoscatiUser newUser = new MoscatiUser();
        String encryptedPassword = passwordEncoder.encode(moscatiUserDTO.getPassword());
        // new user gets initially a generated password
        newUser.setPassword(encryptedPassword);
        newUser.setNickName(moscatiUserDTO.getNickName());
        if (moscatiUserDTO.getMail() != null) {
            newUser.setMail(moscatiUserDTO.getMail().toLowerCase());
        }
        newUser.setLanguage(moscatiUserDTO.getLanguage());
        // new user is not active
        newUser.setActivation(Constants.DEFAULT_ACTIVATION_STATUS);
        // new user gets registration key
        newUser.setActivationKey(RandomUtil.generateActivationKey());
        MoscatiUserDTO newMoscatiUser = this.moscatiUserMapper.toDto(moscatiUserRepository.save(newUser));

        if (newMoscatiUser.getId() != null) {
            MoscatiUserRol userRol = new MoscatiUserRol();
            userRol.setDamnerUserId(newMoscatiUser.getId());
            MoscatiRol rol = this.damnerRolRepository.findFirstByNombre(Constants.DEFAULT_USER_ROL);
            userRol.setDamnerRol(rol);
            this.damnerUserRolRepository.save(userRol);
        }
        return newMoscatiUser;
    }

    //    private boolean removeNonActivatedUser(User existingUser) {
    //        if (existingUser.isActivated()) {
    //            return false;
    //        }
    //        userRepository.delete(existingUser);
    //        userRepository.flush();
    //        this.clearUserCaches(existingUser);
    //        return true;
    //    }

    //    public User createUser(AdminUserDTO userDTO) {
    //        User user = new User();
    //        user.setLogin(userDTO.getLogin().toLowerCase());
    //        user.setFirstName(userDTO.getFirstName());
    //        user.setLastName(userDTO.getLastName());
    //        if (userDTO.getEmail() != null) {
    //            user.setEmail(userDTO.getEmail().toLowerCase());
    //        }
    //        user.setImageUrl(userDTO.getImageUrl());
    //        if (userDTO.getLangKey() == null) {
    //            user.setLangKey(Constants.DEFAULT_LANGUAGE); // default language
    //        } else {
    //            user.setLangKey(userDTO.getLangKey());
    //        }
    //        String encryptedPassword = passwordEncoder.encode(RandomUtil.generatePassword());
    //        user.setPassword(encryptedPassword);
    //        user.setResetKey(RandomUtil.generateResetKey());
    //        user.setResetDate(Instant.now());
    //        user.setActivated(true);
    //        if (userDTO.getAuthorities() != null) {
    //            Set<Authority> authorities = userDTO
    //                .getAuthorities()
    //                .stream()
    //                .map(authorityRepository::findById)
    //                .filter(Optional::isPresent)
    //                .map(Optional::get)
    //                .collect(Collectors.toSet());
    //            user.setAuthorities(authorities);
    //        }
    //        userRepository.save(user);
    //        this.clearUserCaches(user);
    //        log.debug("Created Information for User: {}", user);
    //        return user;
    //    }

    /**
     * Update all information for a specific user, and return the modified user.
     *
     * @param userDTO user to update.
     * @return updated user.
     */
    //    public Optional<AdminUserDTO> updateUser(AdminUserDTO userDTO) {
    //        return Optional
    //            .of(userRepository.findById(userDTO.getId()))
    //            .filter(Optional::isPresent)
    //            .map(Optional::get)
    //            .map(
    //                user -> {
    //                    this.clearUserCaches(user);
    //                    user.setLogin(userDTO.getLogin().toLowerCase());
    //                    user.setFirstName(userDTO.getFirstName());
    //                    user.setLastName(userDTO.getLastName());
    //                    if (userDTO.getEmail() != null) {
    //                        user.setEmail(userDTO.getEmail().toLowerCase());
    //                    }
    //                    user.setImageUrl(userDTO.getImageUrl());
    //                    user.setActivated(userDTO.isActivated());
    //                    user.setLangKey(userDTO.getLangKey());
    //                    Set<Authority> managedAuthorities = user.getAuthorities();
    //                    managedAuthorities.clear();
    //                    userDTO
    //                        .getAuthorities()
    //                        .stream()
    //                        .map(authorityRepository::findById)
    //                        .filter(Optional::isPresent)
    //                        .map(Optional::get)
    //                        .forEach(managedAuthorities::add);
    //                    this.clearUserCaches(user);
    //                    log.debug("Changed Information for User: {}", user);
    //                    return user;
    //                }
    //            )
    //            .map(AdminUserDTO::new);
    //    }

    //    public void deleteUser(String login) {
    //        userRepository
    //            .findOneByLogin(login)
    //            .ifPresent(
    //                user -> {
    //                    userRepository.delete(user);
    //                    this.clearUserCaches(user);
    //                    log.debug("Deleted User: {}", user);
    //                }
    //            );
    //    }

    /**
     * Update basic information (first name, last name, email, language) for the current user.
     *
     * @param firstName first name of user.
     * @param lastName  last name of user.
     * @param email     email id of user.
     * @param langKey   language key.
     * @param imageUrl  image URL of user.
     */
    public void updateUser(String name, String firstName, String lastName, String email, String langKey, String imageUrl) {
        SecurityUtils
            .getCurrentUserLogin()
            .map(
                moscatiUserLogin ->
                    moscatiUserRepository
                        .findOneByNickNameOrMail(moscatiUserLogin.getUsername(), moscatiUserLogin.getUsername())
                        .map(
                            user -> {
                                user.setFirstName(firstName);
                                user.setLastName(lastName);
                                user.setName(name);
                                if (email != null) {
                                    user.setMail(email.toLowerCase());
                                }
                                user.setLanguage(langKey);
                                user.setImageProfile(imageUrl);
                                this.clearUserCaches(user);
                                log.debug("Changed Information for User: {}", user);
                                return null;
                            }
                        )
            );
    }

    @Transactional(noRollbackFor = Exception.class)
    public PhotoUserAlbumDTO changePhotoProfile(Long id, String photoUserId) {
        try {
            MoscatiUser user = this.moscatiUserRepository.getOne(id);
            if (user == null) {
                throw new BadRequestAlertException("error user not found", "change photo pfofile error", "error");
            }

            this.moscatiUserRepository.updatePhotoUser(id, photoUserId, Instant.now());
            PhotoUserAlbumDTO photoUserAlbumdt = new PhotoUserAlbumDTO();
            photoUserAlbumdt.setUserId(id);
            photoUserAlbumdt.setFotoPersonaId(photoUserId);
            PhotoUserAlbumDTO photoUserAlbumDTO = photoUserAlbumService.save(photoUserAlbumdt);
            if (photoUserAlbumDTO.getId() == null) throw new BadRequestAlertException(
                "error user not found",
                "change photo pfofile error",
                "error"
            );

            return photoUserAlbumDTO;
        } catch (Error error) {
            throw new BadRequestAlertException("error user not found", "change photo pfofile error", "error");
        }
    }

    @Transactional
    public void changePassword(String currentClearTextPassword, String newPassword) {
        SecurityUtils
            .getCurrentUserLogin()
            .map(
                moscatiUserLogin ->
                    moscatiUserRepository
                        .findOneByNickNameOrMail(moscatiUserLogin.getUsername(), moscatiUserLogin.getUsername())
                        .map(
                            user -> {
                                String currentEncryptedPassword = user.getPassword();
                                if (!passwordEncoder.matches(currentClearTextPassword, currentEncryptedPassword)) {
                                    throw new InvalidPasswordException();
                                }
                                String encryptedPassword = passwordEncoder.encode(newPassword);
                                user.setPassword(encryptedPassword);
                                this.clearUserCaches(user);
                                return user;
                            }
                        )
            );
    }

    @Transactional(readOnly = true)
    public Page<AdminUserDTO> getAllManagedUsers(Pageable pageable) {
        return userRepository.findAll(pageable).map(AdminUserDTO::new);
    }

    @Transactional(readOnly = true)
    public Page<UserDTO> getAllPublicUsers(Pageable pageable) {
        return userRepository.findAllByIdNotNullAndActivatedIsTrue(pageable).map(UserDTO::new);
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserWithAuthoritiesByLogin(String login) {
        return userRepository.findOneWithAuthoritiesByLogin(login);
    }

    //    @Transactional(readOnly = true)
    //    public Optional<User> getUserWithAuthorities() {
    //        return SecurityUtils.getCurrentUserLogin().flatMap(userRepository::findOneWithAuthoritiesByLogin);
    //    }

    @Transactional
    public MoscatiUserDTO getUserWithAuthorities() {
        return SecurityUtils
            .getCurrentUserLogin()
            .map(
                moscatiUserLogin ->
                    moscatiUserRepository
                        .findOneByNickNameOrMail(moscatiUserLogin.getUsername(), moscatiUserLogin.getUsername())
                        .map(
                            usuario -> {
                                MoscatiUserDTO damnerUser = moscatiUserMapper.toDto(usuario);
                                MoscatiUserRol roleUser = damnerUserRolRepository.findFirstByDamnerUserId(usuario.getId());
                                if (roleUser != null) {
                                    damnerUser.setRole(roleUser.getDamnerRol().getNombre());
                                    Set<String> authorities = damnerRolAuthoritiesRepository
                                        .findAllByMoscatiRol_Id(roleUser.getDamnerRol().getId())
                                        .stream()
                                        .map(auth -> ("ROLE_" + auth.getDamnerAuthirities().getAccion()))
                                        .collect(Collectors.toSet());
                                    damnerUser.setAuthorities(authorities);
                                }
                                if (damnerUser.getImageProfile() != null) {
                                    FotoPersonaDTO fotoPersonaDTO =
                                        this.fotoPersonaMapper.toDto(this.fotoPersonaService.findOne(damnerUser.getImageProfile()));
                                    damnerUser.setFotoPersona(fotoPersonaDTO);
                                }
                                //            damnerUser.setNotifications(notificacionService.notificacionesPorUsuario().intValue());
                                return damnerUser;
                            }
                        )
                        .orElse(null)
            )
            .orElse(null);
    }

    /**
     * Not activated users should be automatically deleted after 3 days.
     * <p>
     * This is scheduled to get fired everyday, at 01:00 (am).
     */
    @Scheduled(cron = "0 0 1 * * ?")
    public void removeNotActivatedUsers() {
        moscatiUserRepository
            .findAllByActivationKeyIsNotNullAndCreatedDateBefore(Instant.now().minus(3, ChronoUnit.DAYS))
            .forEach(
                user -> {
                    moscatiUserRepository.delete(user);
                    this.clearUserCaches(user);
                }
            );
    }

    /**
     * Gets a list of all the authorities.
     * @return a list of all the authorities.
     */
    @Transactional(readOnly = true)
    public List<String> getAuthorities() {
        return authorityRepository.findAll().stream().map(Authority::getName).collect(Collectors.toList());
    }

    private void clearUserCaches(MoscatiUser user) {
        Objects.requireNonNull(cacheManager.getCache(UserRepository.USERS_BY_LOGIN_CACHE)).evict(user.getNickName());
        if (user.getMail() != null) {
            Objects.requireNonNull(cacheManager.getCache(UserRepository.USERS_BY_EMAIL_CACHE)).evict(user.getMail());
        }
    }
}
