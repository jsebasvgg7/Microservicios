package com.P.Microservicios.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Persona {
    private Long id;
    private String nombre;
    private String direccion;
    private String telefono;
    private String correo;
}