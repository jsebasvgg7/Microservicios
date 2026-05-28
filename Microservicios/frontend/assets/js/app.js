import personaService from "../../services/personaService.js";
import { ui } from "./ui.js";
import { validateForm } from "./validations.js";

let personas = [];

async function cargarPersonas() {
    ui.setLoading(true);
    try {
        personas = await personaService.listar();
        ui.renderTable(personas);
    } catch (err) {
        ui.toast("No se pudo conectar al servidor. ¿Spring Boot está corriendo?", "error");
        console.error(err);
    } finally {
        ui.setLoading(false);
    }
}

function filtrar(query) {
    const q = query.toLowerCase().trim();
    if (!q) return ui.renderTable(personas);
    const filtradas = personas.filter(
        (p) =>
            (p.nombre || "").toLowerCase().includes(q) ||
            (p.direccion || "").toLowerCase().includes(q) ||
            (p.correo || "").toLowerCase().includes(q) ||
            (p.telefono || "").includes(q)
    );
    ui.renderTable(filtradas);
}

async function handleFormSubmit(e) {
    e.preventDefault();
    const f = e.target;
    const data = {
        nombre: f.nombre.value,
        direccion: f.direccion.value,
        telefono: f.telefono.value,
        correo: f.correo.value,
    };

    const { valid, errors } = validateForm(data);
    if (!valid) { ui.showErrors(errors); return; }

    const mode = f.dataset.mode;
    const id = f.dataset.id;

    try {
        if (mode === "create") {
            const nueva = await personaService.crear(data);
            personas.push(nueva);
            ui.toast("✓ Persona creada exitosamente.", "success");
        } else {
            const actualizada = await personaService.actualizar(id, data);
            const idx = personas.findIndex((p) => String(p.id) === String(id));
            if (idx !== -1) personas[idx] = actualizada;
            ui.toast("✓ Persona actualizada.", "success");
        }
        ui.renderTable(personas);
        ui.closeModal();
    } catch (err) {
        ui.toast("Error al guardar. Revisa la consola.", "error");
        console.error(err);
    }
}

async function handleTableClick(e) {
    const btnEdit = e.target.closest(".btn-edit");
    const btnDelete = e.target.closest(".btn-delete");

    if (btnEdit) {
        const id = btnEdit.dataset.id;
        const persona = personas.find((p) => String(p.id) === String(id));
        if (persona) ui.openModal("Editar Persona", persona);
    }

    if (btnDelete) {
        const id = btnDelete.dataset.id;
        const persona = personas.find((p) => String(p.id) === String(id));
        if (!persona) return;

        if (!confirm(`¿Eliminar a "${persona.nombre}"? Esta acción no se puede deshacer.`)) return;

        try {
            await personaService.eliminar(id);
            personas = personas.filter((p) => String(p.id) !== String(id));
            ui.renderTable(personas);
            ui.toast("🗑 Persona eliminada.", "info");
        } catch (err) {
            ui.toast("Error al eliminar.", "error");
            console.error(err);
        }
    }
}

function init() {
    cargarPersonas();

    document.getElementById("btn-nueva-persona")?.addEventListener("click", () => {
        ui.openModal("Nueva Persona");
    });

    document.getElementById("btn-cerrar-modal")?.addEventListener("click", () => ui.closeModal());
    document.getElementById("btn-cancelar")?.addEventListener("click", () => ui.closeModal());
    document.getElementById("modal-overlay")?.addEventListener("click", () => ui.closeModal());

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") ui.closeModal();
    });

    document.getElementById("persona-form")?.addEventListener("submit", handleFormSubmit);

    document.getElementById("personas-tbody")?.addEventListener("click", handleTableClick);

    document.getElementById("search-input")?.addEventListener("input", (e) => {
        filtrar(e.target.value);
    });

    document.querySelectorAll("#persona-form input").forEach((input) => {
        input.addEventListener("input", () => {
            const err = document.getElementById(`error-${input.name}`);
            if (err) { err.textContent = ""; err.classList.add("hidden"); }
            input.classList.remove("input-error");
        });
    });
}

document.addEventListener("DOMContentLoaded", init);