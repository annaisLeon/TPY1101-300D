-- Script de creación de base de datos
-- Sistema Mantenedor de Usuarios

-- Crear la base de datos (ejecutar como superusuario si no existe)
-- CREATE DATABASE mantenedor_db;

-- Conectarse a la base de datos antes de ejecutar lo siguiente:
-- \c mantenedor_db

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id       BIGSERIAL PRIMARY KEY,
    username VARCHAR(50)  NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nombre   VARCHAR(100) NOT NULL,
    email    VARCHAR(100) NOT NULL UNIQUE,
    rol      VARCHAR(20)  NOT NULL DEFAULT 'USER'
);

-- Datos iniciales mínimos
INSERT INTO usuarios (username, password, nombre, email, rol) VALUES
    ('admin',   'admin123',  'Administrador',  'admin@sistema.cl',   'ADMIN'),
    ('usuario1','pass123',   'Juan Pérez',     'juan@sistema.cl',    'USER'),
    ('usuario2','pass123',   'María González', 'maria@sistema.cl',   'USER')
ON CONFLICT (username) DO NOTHING;
