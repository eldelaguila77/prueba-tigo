package com.carrito_deportivo.auth.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombres;
    private String apellidos;
    private String direccionEnvio;

    @Column(unique = true, nullable = false)
    private String email;

    private LocalDate fechaNacimiento;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;
}
