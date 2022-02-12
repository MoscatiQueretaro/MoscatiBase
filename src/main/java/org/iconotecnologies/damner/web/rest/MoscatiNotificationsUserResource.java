package org.iconotecnologies.damner.web.rest;

import io.micrometer.core.annotation.Timed;
import java.util.List;
import org.iconotecnologies.damner.service.MoscatiNotificationsUserService;
import org.iconotecnologies.damner.service.dto.MoscatiNotificationsDTO;
import org.iconotecnologies.damner.service.dto.MoscatiNotificationsUserDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notificationsUser")
public class MoscatiNotificationsUserResource {

    private final MoscatiNotificationsUserService service;

    public MoscatiNotificationsUserResource(MoscatiNotificationsUserService service) {
        this.service = service;
    }

    @PostMapping("")
    @Timed
    public ResponseEntity<MoscatiNotificationsUserDTO> save(MoscatiNotificationsUserDTO notificationsUserDTO) {
        MoscatiNotificationsUserDTO dto = this.service.save(notificationsUserDTO);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/{id}")
    @Timed
    public ResponseEntity<List<MoscatiNotificationsUserDTO>> getAllById(@PathVariable Long id) {
        List<MoscatiNotificationsUserDTO> dto = this.service.findAllNotificationsByUser(id);
        return ResponseEntity.ok(dto);
    }
}
