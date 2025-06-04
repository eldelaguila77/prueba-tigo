package com.carrito_deportivo.auth.service;

import com.carrito_deportivo.auth.dto.AuthResponse;
import com.carrito_deportivo.auth.dto.LoginRequest;
import com.carrito_deportivo.auth.dto.RegisterRequest;
import com.carrito_deportivo.auth.model.Role;
import com.carrito_deportivo.auth.model.User;
import com.carrito_deportivo.auth.repository.UserRepository;
import com.carrito_deportivo.auth.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("El email ya está registrado.");
        }

        if (request.getFechaNacimiento().isAfter(LocalDate.now().minusYears(18))) {
            throw new RuntimeException("Debes tener al menos 18 años.");
        }

        var user = User.builder()
                .nombres(request.getNombres())
                .apellidos(request.getApellidos())
                .direccionEnvio(request.getDireccionEnvio())
                .email(request.getEmail())
                .fechaNacimiento(request.getFechaNacimiento())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        userRepository.save(user);

        var jwt = jwtUtils.generateToken(user);
        return AuthResponse.builder().token(jwt).build();
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtils.generateToken(user);
        System.out.println("Token generado: " + token);

        return new AuthResponse(token);
    }
}
