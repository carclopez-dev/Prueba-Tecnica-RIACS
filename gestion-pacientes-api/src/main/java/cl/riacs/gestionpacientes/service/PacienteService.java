package cl.riacs.gestionpacientes.service;

import cl.riacs.gestionpacientes.entity.Paciente;
import cl.riacs.gestionpacientes.repository.PacienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {

    private final PacienteRepository pacienteRepository;

    public PacienteService(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }

    public List<Paciente> listarPacientes() {
        return pacienteRepository.findAll();
    }

    public Optional<Paciente> buscarPacientePorId(Long id) {
        return pacienteRepository.findById(id);
    }

    public Paciente guardarPaciente(Paciente paciente) {
        paciente.setRut(normalizarRut(paciente.getRut()));
        return pacienteRepository.save(paciente);
    }

    public void eliminarPaciente(Long id) {
        pacienteRepository.deleteById(id);
    }

    public boolean existeRut(String rut) {
        return pacienteRepository.existsByRut(normalizarRut(rut));
    }

    public boolean existeRutEnOtroPaciente(String rut, Long id) {
        return pacienteRepository.existsByRutAndIdNot(normalizarRut(rut), id);
    }

    private String normalizarRut(String rut) {

        if (rut == null) {
            return null;
        }

        return rut
                .replace(".", "")
                .replace("-", "")
                .toUpperCase();
    }
}