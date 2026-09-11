package cl.riacs.gestionpacientes.controller;

import cl.riacs.gestionpacientes.entity.Paciente;
import cl.riacs.gestionpacientes.service.PacienteService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pacientes")
@Tag(
        name = "Pacientes",
        description = "Operaciones para la administración de pacientes"
)
public class PacienteController {

    private final PacienteService pacienteService;

    public PacienteController(PacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }

    @Operation(
            summary = "Listar pacientes",
            description = "Obtiene la lista de todos los pacientes registrados"
    )
    @ApiResponse(
            responseCode = "200",
            description = "Lista de pacientes obtenida correctamente"
    )
    @GetMapping
    public List<Paciente> listarPacientes() {
        return pacienteService.listarPacientes();
    }

    @Operation(
            summary = "Buscar paciente por ID",
            description = "Obtiene un paciente utilizando su identificador"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Paciente encontrado"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Paciente no encontrado"
            )
    })
    @GetMapping("/{id}")
    public ResponseEntity<Paciente> buscarPacientePorId(@PathVariable Long id) {

        return pacienteService.buscarPacientePorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(
            summary = "Registrar paciente",
            description = "Registra un nuevo paciente"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Paciente registrado correctamente"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Datos del paciente no válidos o RUT ya registrado"
            )
    })
    @PostMapping
    public ResponseEntity<?> registrarPaciente(
            @Valid @RequestBody Paciente paciente) {

        if (pacienteService.existeRut(paciente.getRut())) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of(
                            "rut",
                            "Ya existe un paciente registrado con este RUT"
                    ));
        }

        Paciente pacienteGuardado =
                pacienteService.guardarPaciente(paciente);

        return ResponseEntity.ok(pacienteGuardado);
    }

    @Operation(
            summary = "Modificar paciente",
            description = "Modifica los datos de un paciente existente"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Paciente modificado correctamente"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Datos del paciente no válidos o RUT ya registrado"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Paciente no encontrado"
            )
    })
    @PutMapping("/{id}")
    public ResponseEntity<?> modificarPaciente(
            @PathVariable Long id,
            @Valid @RequestBody Paciente paciente) {

        if (pacienteService.buscarPacientePorId(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        if (pacienteService.existeRutEnOtroPaciente(
                paciente.getRut(), id)) {

            return ResponseEntity
                    .badRequest()
                    .body(Map.of(
                            "rut",
                            "Ya existe otro paciente registrado con este RUT"
                    ));
        }

        paciente.setId(id);

        Paciente pacienteActualizado =
                pacienteService.guardarPaciente(paciente);

        return ResponseEntity.ok(pacienteActualizado);
    }

    @Operation(
            summary = "Eliminar paciente",
            description = "Elimina un paciente utilizando su identificador"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Paciente eliminado correctamente"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Paciente no encontrado"
            )
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> eliminarPaciente(
            @PathVariable Long id) {

        if (pacienteService.buscarPacientePorId(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        pacienteService.eliminarPaciente(id);

        return ResponseEntity.ok(
                Map.of(
                        "mensaje",
                        "Paciente eliminado correctamente"
                )
        );
    }
}