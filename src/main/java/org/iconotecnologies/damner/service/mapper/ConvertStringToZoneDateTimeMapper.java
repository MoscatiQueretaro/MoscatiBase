package org.iconotecnologies.damner.service.mapper;

import java.time.*;
import java.time.format.DateTimeFormatter;
import net.bytebuddy.implementation.bytecode.Throw;
import org.iconotecnologies.damner.service.dto.files.FotoPersonaDTO;
import org.iconotecnologies.damner.web.rest.errors.BadRequestAlertException;
import org.mapstruct.Named;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ConvertStringToZoneDateTimeMapper {

    @Transactional(readOnly = true)
    @Named("convertStringToZoneDateTime")
    public ZonedDateTime convertStringToZoneDateTime(String fecha) {
        if (fecha != null) {
            ZoneId timeZone = ZoneId.systemDefault();
            fecha = fecha.replace(" ", "T");
            System.out.println(LocalDateTime.parse(fecha, DateTimeFormatter.ISO_DATE_TIME).atZone(timeZone));
            ZonedDateTime zdtWithZoneOffset = LocalDateTime.parse(fecha, DateTimeFormatter.ISO_DATE_TIME).atZone(timeZone);
            return zdtWithZoneOffset;
        } else {
            return null;
        }
    }

    @Transactional(readOnly = true)
    @Named("convertZoneDateTimeToString")
    public String convertZoneDateTimeToString(ZonedDateTime fecha) {
        if (fecha != null) {
            ZonedDateTime utcZoned = fecha;
            ZoneId swissZone = ZoneId.systemDefault();
            ZonedDateTime swissZoned = utcZoned.withZoneSameInstant(swissZone);
            LocalDateTime swissLocal = swissZoned.toLocalDateTime();
            String finalDateTime = swissLocal.toString() + utcZoned.getOffset();
            return finalDateTime;
        } else {
            return null;
        }
    }
}
