package org.iconotecnologies.rk.service;

import java.util.List;
import org.iconotecnologies.rk.domain.RKDoctores;
import org.iconotecnologies.rk.repository.RKDoctoresRepository;
import org.iconotecnologies.rk.service.dto.RKDoctoresDTO;
import org.iconotecnologies.rk.service.mapper.RKDoctoresMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class RKDoctoresService {

    private final RKDoctoresRepository repository;
    private final RKDoctoresMapper mapper;

    public RKDoctoresService(RKDoctoresRepository repository, RKDoctoresMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Transactional
    public RKDoctoresDTO save(RKDoctoresDTO rkDoctoresDTO) {
        RKDoctores moscatiDoctores = this.repository.save(this.mapper.toEntity(rkDoctoresDTO));
        return this.mapper.toDto(moscatiDoctores);
    }

    @Transactional(readOnly = true)
    public RKDoctoresDTO findOneByProfessionalLicence(String cedula) {
        RKDoctores rkDoctor = this.repository.findFirstByProfessionalLicence(cedula);
        return this.mapper.toDto(rkDoctor);
    }

    @Transactional(readOnly = true)
    public List<RKDoctoresDTO> findAll() {
        List<RKDoctores> rkDoctoresList = this.repository.findAll();
        return this.mapper.toDto(rkDoctoresList);
    }
}
