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
    fecha_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_final_apreciada TIMESTAMP NOT NULL,
    name_procedimiento VARCHAR(50) NOT NULL,
    detalles VARCHAR(255)
);
CREATE TABLE seguimiento(
    id_seguimiento_mascota INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    fk_procedimiento INT NOT NULL, 
    FOREIGN KEY (fk_procedimiento) REFERENCES procedimiento(id_procedimiento_mascota)
);
