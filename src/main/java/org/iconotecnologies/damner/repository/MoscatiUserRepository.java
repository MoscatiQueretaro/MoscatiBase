package org.iconotecnologies.damner.repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import org.iconotecnologies.damner.domain.MoscatiUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MoscatiUserRepository extends JpaRepository<MoscatiUser, Long> {
    Optional<MoscatiUser> findOneById(Long id);

    Optional<MoscatiUser> findOneByNickNameOrMail(String username, String mail);
    MoscatiUser findFirstByNickName(String nickName);
    List<MoscatiUser> findAllByActivationKeyIsNotNullAndActivationIsAndCreatedDateBefore(String activation, Instant minus);
    Optional<MoscatiUser> findFirstByNickNameOrMail(String username, String mail);
    MoscatiUser findFirstByMail(String eMail);

    @Modifying(clearAutomatically = true)
    @Query("update MoscatiUser user set user.imageProfile =:photoUserId, user.lastModifiedDate =:lastDate where user.id =:id")
    void updatePhotoUser(@Param("id") Long id, @Param("photoUserId") String photoUserId, @Param("lastDate") Instant lastDate);
}
