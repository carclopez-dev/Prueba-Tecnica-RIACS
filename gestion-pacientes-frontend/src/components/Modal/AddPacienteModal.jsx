import { useState } from "react";
import "../../css/components/AddPacienteModal.css";
import { crearPaciente } from "../../services/pacienteService";

function AddPacienteModal({ isOpen, onClose, onPacienteCreated }) {

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [rut, setRut] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [correoElectronico, setCorreoElectronico] = useState("");
    const [telefono, setTelefono] = useState("");

    if (!isOpen) return null;

    const limpiarFormulario = () => {
        setNombre("");
        setApellido("");
        setRut("");
        setFechaNacimiento("");
        setCorreoElectronico("");
        setTelefono("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const nuevoPaciente = {
                nombre: nombre,
                apellido: apellido,
                rut: rut,
                fechaNacimiento: fechaNacimiento,
                correoElectronico: correoElectronico,
                telefono: telefono
            };

            console.log("Paciente enviado:", nuevoPaciente);

            await crearPaciente(nuevoPaciente);

            limpiarFormulario();

            if (onPacienteCreated) {
                onPacienteCreated();
            }

            onClose();

        } catch (error) {
            console.error("Error al guardar paciente:", error);
            alert(error.message || "Error al guardar paciente");
        }
    };

    const cerrarModal = () => {
        limpiarFormulario();
        onClose();
    };

    return (
        <div className="paciente-modal-overlay">

            <div className="paciente-modal-container">

                <button
                    type="button"
                    className="paciente-modal-close"
                    onClick={cerrarModal}
                >
                    X
                </button>

                <h2 className="paciente-modal-title">
                    Registrar paciente
                </h2>

                <form
                    className="paciente-modal-form"
                    onSubmit={handleSubmit}
                >

                    <div className="paciente-modal-row">

                        <div className="paciente-modal-group">

                            <label>Nombre</label>

                            <input
                                type="text"
                                placeholder="Ej: Carlos"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />

                        </div>


                        <div className="paciente-modal-group">

                            <label>Apellido</label>

                            <input
                                type="text"
                                placeholder="Ej: López"
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                                required
                            />

                        </div>

                    </div>


                    <div className="paciente-modal-row">

                        <div className="paciente-modal-group">

                            <label>RUT</label>

                            <input
                                type="text"
                                placeholder="Ej: 21.950.616-3"
                                value={rut}
                                onChange={(e) => setRut(e.target.value)}
                                required
                            />

                        </div>


                        <div className="paciente-modal-group">

                            <label>Fecha de nacimiento</label>

                            <input
                                type="date"
                                value={fechaNacimiento}
                                onChange={(e) => setFechaNacimiento(e.target.value)}
                                required
                            />

                        </div>

                    </div>


                    <div className="paciente-modal-row">

                        <div className="paciente-modal-group">

                            <label>Correo electrónico</label>

                            <input
                                type="email"
                                placeholder="Ej: carlos@gmail.com"
                                value={correoElectronico}
                                onChange={(e) => setCorreoElectronico(e.target.value)}
                                required
                            />

                        </div>


                        <div className="paciente-modal-group">

                            <label>Teléfono</label>

                            <input
                                type="text"
                                placeholder="Ej: 987654321"
                                value={telefono}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, "");
                                    setTelefono(value);
                                }}
                                required
                            />

                        </div>

                    </div>


                    <div className="paciente-modal-buttons">

                        <button
                            type="button"
                            className="paciente-btn-cancel"
                            onClick={cerrarModal}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="paciente-btn-save"
                        >
                            Guardar
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddPacienteModal;