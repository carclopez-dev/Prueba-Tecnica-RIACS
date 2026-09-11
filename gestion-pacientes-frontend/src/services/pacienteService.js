const API_URL = "http://localhost:8080/api/pacientes";

export const crearPaciente = async (paciente) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(paciente),
    });

    if (!response.ok) {
        const errorText = await response.text();

        console.error("Error backend:", errorText);
        console.error("Status:", response.status);

        throw new Error(errorText || "Error al crear paciente");
    }

    return await response.json();
};


export const obtenerPacientes = async () => {
    const response = await fetch(API_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorText = await response.text();

        console.error("Error backend:", errorText);
        console.error("Status:", response.status);

        throw new Error(errorText || "Error al obtener pacientes");
    }

    return await response.json();
};


export const obtenerPacientePorId = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorText = await response.text();

        console.error("Error backend:", errorText);
        console.error("Status:", response.status);

        throw new Error(errorText || "Error al obtener paciente");
    }

    return await response.json();
};


export const actualizarPaciente = async (id, paciente) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(paciente),
    });

    if (!response.ok) {
        const errorText = await response.text();

        console.error("Error backend:", errorText);
        console.error("Status:", response.status);

        throw new Error(errorText || "Error al actualizar paciente");
    }

    return await response.json();
};


export const eliminarPaciente = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorText = await response.text();

        console.error("Error backend:", errorText);
        console.error("Status:", response.status);

        throw new Error(errorText || "Error al eliminar paciente");
    }
};