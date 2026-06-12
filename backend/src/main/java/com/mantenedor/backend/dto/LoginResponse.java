package com.mantenedor.backend.dto;

public class LoginResponse {
    private boolean success;
    private String mensaje;
    private String username;
    private String rol;

    public LoginResponse(boolean success, String mensaje, String username, String rol) {
        this.success = success;
        this.mensaje = mensaje;
        this.username = username;
        this.rol = rol;
    }

    public boolean isSuccess() { return success; }
    public String getMensaje() { return mensaje; }
    public String getUsername() { return username; }
    public String getRol() { return rol; }
}
