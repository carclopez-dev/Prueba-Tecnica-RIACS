import "../../css/components/DeletePacienteModal.css";

export function DeletePacienteModal({
    paciente,
    cerrarModal,
    eliminarPacienteConfirmado,
}) {
    return (
        <div className="paciente-delete-overlay">

            <div className="paciente-delete-container">

                <h2>
                    ¿Estás seguro que deseas eliminar este paciente?
                </h2>

                <p className="paciente-delete-warning">
                    Esta acción no se puede deshacer.
                </p>

                <div className="paciente-delete-info">

                    <p>
                        <strong>Nombre:</strong>{" "}
                        {paciente?.nombre || "Sin nombre"}
                    </p>

                    <p>
                        <strong>Apellido:</strong>{" "}
                        {paciente?.apellido || "Sin apellido"}
                    </p>

                    <p>
                        <strong>RUT:</strong>{" "}
                        {paciente?.rut || "Sin RUT"}
                    </p>

                    <p>
                        <strong>Correo:</strong>{" "}
                        {paciente?.correoElectronico || "Sin correo"}
                    </p>

                </div>

                <div className="paciente-delete-buttons">

                    <button
                        type="button"
                        className="paciente-delete-cancel"
                        onClick={cerrarModal}
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        className="paciente-delete-confirm"
                        onClick={() =>
                            eliminarPacienteConfirmado(paciente.id)
                        }
                    >
                        Sí, eliminar
                    </button>

                </div>

            </div>

        </div>
    );
}