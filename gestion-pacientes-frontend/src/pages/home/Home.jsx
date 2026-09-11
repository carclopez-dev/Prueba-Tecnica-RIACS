import { useEffect, useState } from 'react'
import '../../css/pages/Home.css'

import AddPacienteModal from '../../components/Modal/AddPacienteModal'
import EditPacienteModal from '../../components/Modal/EditPacienteModal'
import { DeletePacienteModal } from '../../components/Modal/DeletePacienteModal'

import {
    obtenerPacientes,
    actualizarPaciente,
    eliminarPaciente
} from '../../services/pacienteService'

export function Home() {
    const [rutBusqueda, setRutBusqueda] = useState('')
    const [isAddPacienteModalOpen, setIsAddPacienteModalOpen] = useState(false)

    const [pacientes, setPacientes] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState('')

    const [pacienteAEditar, setPacienteAEditar] = useState(null)
    const [pacienteAEliminar, setPacienteAEliminar] = useState(null)

    const cargarPacientes = async () => {
        try {
            setCargando(true)
            setError('')

            const data = await obtenerPacientes()

            setPacientes(Array.isArray(data) ? data : [])

        } catch (error) {
            console.error('Error al cargar pacientes:', error)
            setError('No se pudieron cargar los pacientes')
        } finally {
            setCargando(false)
        }
    }

    useEffect(() => {
        cargarPacientes()
    }, [])

    const abrirModalEditar = (paciente) => {
        setPacienteAEditar({ ...paciente })
    }

    const cerrarModalEditarPaciente = () => {
        setPacienteAEditar(null)
    }

    const guardarCambiosPaciente = async () => {
        if (!pacienteAEditar) return

        try {
            await actualizarPaciente(
                pacienteAEditar.id,
                pacienteAEditar
            )

            cerrarModalEditarPaciente()

            await cargarPacientes()

        } catch (error) {
            console.error('Error al actualizar paciente:', error)
            alert(error.message || 'Error al actualizar paciente')
        }
    }

    const abrirModalEliminar = (paciente) => {
        setPacienteAEliminar(paciente)
    }

    const cerrarModalEliminar = () => {
        setPacienteAEliminar(null)
    }

    const eliminarPacienteConfirmado = async (id) => {
        try {
            await eliminarPaciente(id)

            cerrarModalEliminar()

            await cargarPacientes()

        } catch (error) {
            console.error('Error al eliminar paciente:', error)
            alert(error.message || 'Error al eliminar paciente')
        }
    }

    const pacientesFiltrados = pacientes.filter((paciente) => {
        return paciente.rut
            ?.toLowerCase()
            .includes(rutBusqueda.toLowerCase())
    })

    return (
        <div className="contenedor-home">

            <main className="contenido-home">

                <div className="encabezado-home">

                    <div>
                        <h1>Gestión de Pacientes</h1>

                        <p>
                            Consulta y gestiona todos los pacientes registrados
                        </p>
                    </div>

                    <button
                        type="button"
                        className="boton-agregar-paciente"
                        onClick={() => setIsAddPacienteModalOpen(true)}
                    >
                        + Agregar Paciente
                    </button>

                </div>

                <div className="barra-pacientes">

                    <div className="input-busqueda-pacientes">

                        <input
                            type="text"
                            placeholder="Buscar paciente por RUT"
                            value={rutBusqueda}
                            onChange={(e) => setRutBusqueda(e.target.value)}
                        />

                    </div>

                </div>

                <div className="contenedor-tabla-pacientes">

                    {cargando ? (

                        <p className="mensaje-sin-pacientes">
                            Cargando pacientes...
                        </p>

                    ) : error ? (

                        <p className="mensaje-sin-pacientes">
                            {error}
                        </p>

                    ) : pacientesFiltrados.length === 0 ? (

                        <p className="mensaje-sin-pacientes">
                            No se encontraron pacientes
                        </p>

                    ) : (

                        <table className="tabla-pacientes">

                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>RUT</th>
                                    <th>Fecha de nacimiento</th>
                                    <th>Correo electrónico</th>
                                    <th>Teléfono</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>

                                {pacientesFiltrados.map((paciente) => (

                                    <tr key={paciente.id}>

                                        <td>{paciente.nombre}</td>

                                        <td>{paciente.apellido}</td>

                                        <td>{paciente.rut}</td>

                                        <td>{paciente.fechaNacimiento}</td>

                                        <td>{paciente.correoElectronico}</td>

                                        <td>{paciente.telefono}</td>

                                        <td className="acciones-paciente">

                                            <button
                                                type="button"
                                                className="boton-editar-paciente"
                                                onClick={() =>
                                                    abrirModalEditar(paciente)
                                                }
                                            >
                                                Editar
                                            </button>

                                            <button
                                                type="button"
                                                className="boton-eliminar-paciente"
                                                onClick={() =>
                                                    abrirModalEliminar(paciente)
                                                }
                                            >
                                                Eliminar
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    )}

                </div>

            </main>

            <AddPacienteModal
                isOpen={isAddPacienteModalOpen}
                onClose={() => setIsAddPacienteModalOpen(false)}
                onPacienteCreated={cargarPacientes}
            />

            <EditPacienteModal
                isOpen={pacienteAEditar !== null}
                paciente={pacienteAEditar}
                setPaciente={setPacienteAEditar}
                cerrarModalEditarPaciente={cerrarModalEditarPaciente}
                guardarCambiosPaciente={guardarCambiosPaciente}
            />

            {pacienteAEliminar && (
                <DeletePacienteModal
                    paciente={pacienteAEliminar}
                    cerrarModal={cerrarModalEliminar}
                    eliminarPacienteConfirmado={eliminarPacienteConfirmado}
                />
            )}

        </div>
    )
}