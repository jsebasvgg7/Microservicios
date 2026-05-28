package com.P.Microservicios.Service;



import com.P.Microservicios.Model.Persona;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PersonaService {

    private List<Persona> lista = new ArrayList<>();

    // LISTAR
    public List<Persona> obtenerPersonas() {
        return lista;
    }

    // CREAR
    public Persona guardar(Persona persona) {
        lista.add(persona);
        return persona;
    }

    // CONSULTAR POR ID
    public Persona buscarPorId(Long id) {

        for (Persona p : lista) {
            if (p.getId().equals(id)) {
                return p;
            }
        }

        return null;
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

    // ELIMINAR
    public String eliminar(Long id) {

        for (Persona p : lista) {

            if (p.getId().equals(id)) {
                lista.remove(p);
                return "Persona eliminada";
            }
        }

        return "No encontrada";
    }
}
