package com.P.Microservicios.Controller;

import com.P.Microservicios.Model.Persona;
import com.P.Microservicios.Service.PersonaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/personas")
@CrossOrigin("*")
public class PersonaController {

    @Autowired
    private PersonaService service;

    @GetMapping
    public List<Persona> listar() {
        return service.obtenerPersonas();
    }

    @GetMapping("/{id}")
    public Persona buscar(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public Persona guardar(@RequestBody Persona persona) {
        return service.guardar(persona);
    }

    @PutMapping("/{id}")
    public Persona actualizar(@PathVariable Long id,
                              @RequestBody Persona persona) {
        return service.actualizar(id, persona);
    }

    @DeleteMapping("/{id}")
    public String eliminar(@PathVariable Long id) {
        return service.eliminar(id);
    }
}