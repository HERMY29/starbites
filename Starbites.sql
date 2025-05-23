CREATE DATABASE Starbites;
USE Starbites;

select * from usuario;
select * from publicaciones;
select * from publicaciones_tags;
select * from tags;
select * from comentarios;

INSERT INTO usuario (nombre, correo, contraseña, fecha_nacimiento, genero, telefono, tipo_usuario)
VALUES (
  'Admin StarBites',
  'admin@starbites2.com',
  'Admin123',  -- contraseña: Admin123
  '1990-01-01',
  'otro',
  '5551234567',
  'admin'
);


CREATE TABLE usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(200),
  correo VARCHAR(200),
  contraseña VARCHAR(255),
  fecha_nacimiento DATE,
  genero VARCHAR(50),
  telefono VARCHAR(50),
  tipo_usuario VARCHAR(100)
);

CREATE TABLE publicaciones (
  id_publicacion INT AUTO_INCREMENT PRIMARY KEY,
  tipo ENUM('pelicula', 'libro', 'serie') NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT,
  autor VARCHAR(100),
  calificacion INT,
  imagen LONGBLOB,
  categoria VARCHAR(100),
  estado ENUM('publicada', 'pendiente') DEFAULT 'publicada',
  id_usuario INT,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);


CREATE TABLE tags (
  id_tag INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE publicaciones_tags (
  id_publicacion INT,
  id_tag INT,
  PRIMARY KEY (id_publicacion, id_tag),
  FOREIGN KEY (id_publicacion) REFERENCES publicaciones(id_publicacion) ON DELETE CASCADE,
  FOREIGN KEY (id_tag) REFERENCES tags(id_tag) ON DELETE CASCADE
);

CREATE TABLE comentarios (
  id_comentario INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  id_publicacion INT NOT NULL,
  contenido TEXT NOT NULL,
  estado ENUM('activo', 'oculto') DEFAULT 'activo',
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id),
  FOREIGN KEY (id_publicacion) REFERENCES publicaciones(id_publicacion)
);

CREATE TABLE peticion (
  id_peticion INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  tipo ENUM('pelicula', 'libro', 'serie') NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  mensaje TEXT,
  productora VARCHAR(255),
  fecha_estreno DATE,
  estado ENUM('pendiente', 'aceptada', 'rechazada') DEFAULT 'pendiente',
  fecha_peticion DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);