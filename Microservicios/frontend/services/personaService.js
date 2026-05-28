import api from "../assets/js/api.js";
import ENV from "../config/environment.js";

const EP = ENV.PERSONAS_ENDPOINT;

const personaService = {
    listar: () => api.get(EP),

    buscarPorId: (id) => api.get(`${EP}/${id}`),

    crear: (persona) => api.post(EP, persona),

    actualizar: (id, persona) => api.put(`${EP}/${id}`, persona),

    eliminar: (id) => api.delete(`${EP}/${id}`),
};

export default personaService;
