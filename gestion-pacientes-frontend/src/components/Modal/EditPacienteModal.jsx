import "../../css/components/EditPacienteModal.css";

function EditPacienteModal({
    isOpen,
    paciente,
    setPaciente,
    cerrarModalEditarPaciente,
    guardarCambiosPaciente
}) {
    if (!isOpen || !paciente) return null;

    return (
        <div className="edit-paciente-overlay">

            <div className="edit-paciente-modal">

                <button
                    type="button"
                    className="edit-paciente-close"
                    onClick={cerrarModalEditarPaciente}
                >
                    X
                </button>

                <h2>Editar paciente</h2>

                <div className="edit-paciente-row">

                    <div className="edit-paciente-group">
                        <label>Nombre</label>

                        <input
                            type="text"
                            value={paciente.nombre}
                            placeholder="Ej: Carlos"
                            onChange={(e) =>
                                setPaciente({
                                    ...paciente,
                                    nombre: e.target.value
                                })
                            }
                        />
                    </div>

                    <div className="edit-paciente-group">
                        <label>Apellido</label>

                        <input
                            type="text"
                            value={paciente.apellido}
                            placeholder="Ej: López"
                            onChange={(e) =>
                                setPaciente({
                                    ...paciente,
                                    apellido: e.target.value
                                })
                            }
                        />
                    </div>

                </div>


                <div className="edit-paciente-row">

                    <div className="edit-paciente-group">
                        <label>RUT</label>

                        <input
                            type="text"
                            value={paciente.rut}
                            placeholder="Ej: 12.345.678-5"
                            onChange={(e) =>
                                setPaciente({
                                    ...paciente,
                                    rut: e.target.value
                                })
                            }
                        />
                    </div>

                    <div className="edit-paciente-group">
                        <label>Fecha de nacimiento</label>

                        <input
                            type="date"
                            value={paciente.fechaNacimiento}
                            onChange={(e) =>
                                setPaciente({
                                    ...paciente,
                                    fechaNacimiento: e.target.value
                                })
                            }
                        />
                    </div>

                </div>


                <div className="edit-paciente-row">

                    <div className="edit-paciente-group">
                        <label>Correo electrónico</label>

                        <input
                            type="email"
                            value={paciente.correoElectronico}
                            placeholder="Ej: carlos@gmail.com"
                            onChange={(e) =>
                                setPaciente({
                                    ...paciente,
                                    correoElectronico: e.target.value
                                })
                            }
                        />
                    </div>

                    <div className="edit-paciente-group">
                        <label>Teléfono</label>

                        <input
                            type="text"
                            value={paciente.telefono}
                            placeholder="Ej: 987654321"
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");

                                setPaciente({
                                    ...paciente,
                                    telefono: value
                                });
                            }}
                        />
                    </div>

                </div>


                <div className="edit-paciente-buttons">

                    <button
                        type="button"
                        className="edit-paciente-cancel"
                        onClick={cerrarModalEditarPaciente}
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        className="edit-paciente-save"
                        onClick={guardarCambiosPaciente}
                    >
                        Guardar
                    </button>

                </div>

            </div>

        </div>
    );
}

export default EditPacienteModal;