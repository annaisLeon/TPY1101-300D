package com.mantenedor.backend.controller;

import com.mantenedor.backend.model.Usuario;
import com.mantenedor.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<Usuario> listar() {
        return usuarioService.listarTodos();
    }

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Usuario usuario) {
        try {
            Usuario creado = usuarioService.crear(usuario);
            return ResponseEntity.status(201).body(creado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al crear usuario: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscar(@PathVariable Long id) {
        return usuarioService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id, @RequestBody Usuario datos) {
        return usuarioService.actualizar(id, datos)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        if (usuarioService.eliminar(id)) {
            return ResponseEntity.ok("Usuario eliminado correctamente");
        }
        return ResponseEntity.notFound().build();
    }
}
