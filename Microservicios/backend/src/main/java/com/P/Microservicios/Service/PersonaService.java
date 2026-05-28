package com.P.Microservicios.Service;

import com.P.Microservicios.Model.Persona;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PersonaService {

    private final List<Persona> lista = new ArrayList<>();
    private Long nextId = 1L;

    // LISTAR
    public List<Persona> obtenerPersonas() {
        return lista;
    }

    // CREAR — asigna ID automáticamente
    public Persona guardar(Persona persona) {
        persona.setId(nextId++);
        lista.add(persona);
        return persona;
    }

    // CONSULTAR POR ID
    public Persona buscarPorId(Long id) {
        return lista.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    // ACTUALIZAR
    public Persona actualizar(Long id, Persona nuevaPersona) {
        for (Persona p : lista) {
            if (p.getId().equals(id)) {
                p.setNombre(nuevaPersona.getNombre());
                p.setDireccion(nuevaPersona.getDireccion());
                p.setTelefono(nuevaPersona.getTelefono());
                p.setCorreo(nuevaPersona.getCorreo());
                return p;
            }
        }
        return null;
    }

    // ELIMINAR — usa removeIf para evitar ConcurrentModificationException
    public String eliminar(Long id) {
        boolean eliminado = lista.removeIf(p -> p.getId().equals(id));
        return eliminado ? "Persona eliminada" : "No encontrada";
    }
}