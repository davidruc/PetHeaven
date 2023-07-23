CREATE DATABASE petheaven;
USE petheaven;

CREATE TABLE especie(
    id_especie INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre_especie VARCHAR(25) NOT NULL
);
CREATE TABLE raza(
    id_raza INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre_raza VARCHAR(25) NOT NULL,
    fk_especie INT NOT NULL,
    FOREIGN KEY (fk_especie) REFERENCES especie(id_especie)     
);
CREATE TABLE procedimiento(
    id_procedimiento_mascota INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name_procedimiento VARCHAR(50) NOT NULL,
    detalles VARCHAR(255)
);
CREATE TABLE estado_plan(
    id_estado INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    estado VARCHAR(15) NOT NULL
);
CREATE TABLE tipo_afiliacion(
    id_afiliacion INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    plan_usuario VARCHAR(15) NOT NULL 
);
CREATE TABLE usuario(
    id_usuario INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre_usuario VARCHAR(255) NOT NULL,
    telefono_contacto INT(20) NOT NULL,
    documento INT(20) NOT NULL
);
CREATE TABLE plan(
    id_plan INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    fecha_afiliacion TIMESTAMP NOT NULL,
    fk_estado_plan INT NOT NULL,
    fk_tipo_afiliacion INT NOT NULL,
    fk_usuario INT NOT NULL,
    FOREIGN KEY (fk_estado_plan) REFERENCES estado_plan(id_estado),
    FOREIGN KEY (fk_tipo_afiliacion) REFERENCES tipo_afiliacion(id_afiliacion),
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario)
);
CREATE TABLE mascota(
    id_mascota INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre_mascota VARCHAR(50) NOT NULL,
    edad_mascota TINYINT(2),
    fk_dueño INT NOT NULL,
    fk_raza INT NOT NULL,
    FOREIGN KEY (fk_dueño) REFERENCES usuario(id_usuario),
    FOREIGN KEY (fk_raza) REFERENCES raza(id_raza)
);
CREATE TABLE seguimiento(
    id_seguimiento_mascota INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    fk_procedimiento INT NOT NULL, 
    fk_mascota INT NOT NULL,
    fecha_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_final_apreciada TIMESTAMP NOT NULL,
    FOREIGN KEY (fk_procedimiento) REFERENCES procedimiento(id_procedimiento_mascota),
    FOREIGN KEY (fk_mascota) REFERENCES mascota(id_mascota)
);