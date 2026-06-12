package com.mantenedor.backend.controller;

import com.mantenedor.backend.dto.LoginRequest;
import com.mantenedor.backend.dto.LoginResponse;
import com.mantenedor.backend.model.Usuario;
import com.mantenedor.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        Optional<Usuario> usuario = usuarioService.login(request.getUsername(), request.getPassword());

        if (usuario.isPresent()) {
            Usuario u = usuario.get();
            return ResponseEntity.ok(new LoginResponse(true, "Login exitoso", u.getUsername(), u.getRol()));
        }

        return ResponseEntity.status(401)
                .body(new LoginResponse(false, "Credenciales inválidas", null, null));
    }
}
