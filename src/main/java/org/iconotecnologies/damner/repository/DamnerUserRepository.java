package org.iconotecnologies.damner.repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import org.iconotecnologies.damner.domain.DamnerUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DamnerUserRepository extends JpaRepository<DamnerUser, Long> {
    Optional<DamnerUser> findOneById(Long id);

    Optional<DamnerUser> findOneByNickName(String username);
    List<DamnerUser> findAllByActivationKeyIsNotNullAndCreatedDateBefore(Instant minus);
    DamnerUser findFirstByNickName(String username);
    DamnerUser findFirstByMail(String eMail);

    @Modifying(clearAutomatically = true)
    @Query("update DamnerUser user set user.imageProfile =:photoUserId, user.lastModifiedDate =:lastDate where user.id =:id")
    void updatePhotoUser(@Param("id") Long id, @Param("photoUserId") String photoUserId, @Param("lastDate") Instant lastDate);
}
