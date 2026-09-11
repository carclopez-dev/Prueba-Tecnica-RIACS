package cl.riacs.gestionpacientes.repository;

import cl.riacs.gestionpacientes.entity.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {

    boolean existsByRut(String rut);

    boolean existsByRutAndIdNot(String rut, Long id);
}