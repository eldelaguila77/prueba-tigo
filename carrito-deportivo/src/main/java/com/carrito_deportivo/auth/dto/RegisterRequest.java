package com.carrito_deportivo.auth.dto;

import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequest {
    private String nombres;
    private String apellidos;
    private String direccionEnvio;
    private String email;
    private LocalDate fechaNacimiento;
    private String password;
}