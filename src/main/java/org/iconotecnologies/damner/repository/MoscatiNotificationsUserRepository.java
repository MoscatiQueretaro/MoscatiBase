package org.iconotecnologies.damner.repository;

import java.util.List;
import org.iconotecnologies.damner.domain.MoscatiNotificationsUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface MoscatiNotificationsUserRepository
    extends JpaRepository<MoscatiNotificationsUser, String>, JpaSpecificationExecutor<MoscatiNotificationsUser> {
    List<MoscatiNotificationsUser> findAllByUserId_Id(Long id);
}
