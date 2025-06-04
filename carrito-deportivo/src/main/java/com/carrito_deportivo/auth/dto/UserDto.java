package com.carrito_deportivo.auth.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String nombres;
    private String apellidos;
    private String email;
    private String direccionEnvio;
    private LocalDate fechaNacimiento;
}
