package com.carrito_deportivo.auth.service;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.carrito_deportivo.auth.dto.UserDto;
import com.carrito_deportivo.auth.dto.UserUpdateRequest;
import com.carrito_deportivo.auth.model.User;
import com.carrito_deportivo.auth.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.mail.SimpleMailMessage;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    //private final JavaMailSender mailSender; // para enviar emails, configúralo en tu app
    //private final PasswordResetTokenRepository tokenRepository; // para tokens de recuperación

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
            .map(this::toDto)
            .collect(Collectors.toList());
    }

    public UserDto getUserById(Long id) {
        return userRepository.findById(id)
            .map(this::toDto)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    public UserDto getUserByEmail(String email) {
        return userRepository.findByEmail(email)
            .map(this::toDto)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    public UserDto updateUser(Long id, UserUpdateRequest req) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        if (req.getNombres() != null) user.setNombres(req.getNombres());
        if (req.getApellidos() != null) user.setApellidos(req.getApellidos());
        if (req.getDireccionEnvio() != null) user.setDireccionEnvio(req.getDireccionEnvio());
        if (req.getFechaNacimiento() != null) user.setFechaNacimiento(req.getFechaNacimiento());
        userRepository.save(user);
        return toDto(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    /*public void sendPasswordResetToken(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        // Crear token único, guardar en BD con relación al usuario
        String token = UUID.randomUUID().toString();

        PasswordResetToken prt = new PasswordResetToken();
        prt.setToken(token);
        prt.setUser(user);
        prt.setExpiryDate(LocalDateTime.now().plusHours(1)); // válido 1 hora
        tokenRepository.save(prt);

        // Enviar email con link para resetear (ejemplo con link)
        String resetUrl = "http://tuapp.com/reset-password?token=" + token;

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(user.getEmail());
        mail.setSubject("Recuperación de contraseña");
        mail.setText("Para recuperar tu contraseña, visita el siguiente enlace: " + resetUrl);
        mailSender.send(mail);
    }

    public void resetPassword(String token, String newPassword) {
        PasswordResetToken prt = tokenRepository.findByToken(token)
            .orElseThrow(() -> new RuntimeException("Token inválido o expirado"));
        if (prt.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token expirado");
        }

        User user = prt.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        // Opcional: eliminar token después de usarlo
        tokenRepository.delete(prt);
    }*/

    private UserDto toDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setNombres(user.getNombres());
        dto.setApellidos(user.getApellidos());
        dto.setEmail(user.getEmail());
        dto.setDireccionEnvio(user.getDireccionEnvio());
        dto.setFechaNacimiento(user.getFechaNacimiento());
        return dto;
    }
}
