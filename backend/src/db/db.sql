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
    telefono_contacto INT NOT NULL,
    documento INT NOT NULL
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
INSERT INTO especie (nombre_especie) VALUES
('Perro'),
('Gato'),
('Conejo'),
('Ave'),
('Reptil'),
('Otros');
INSERT INTO raza (nombre_raza, fk_especie) VALUES
('Golden Retriever', 1),
('Persa', 2),
('Angora', 2),
('Pug', 1),
('Siamés', 2),
('Labrador', 1);
INSERT INTO procedimiento (name_procedimiento, detalles) VALUES
('Cremación', 'Proceso de cremar el cuerpo del animal fallecido.'),
('Inhumación', 'Entierro del cuerpo del animal fallecido en un cementerio o lugar especial.'),
('Velas de despedida', 'Ceremonia de velas para despedir al animal fallecido.'),
('Certificado de defunción', 'Entrega de un certificado que confirma la defunción del animal.'),
('Ataúd o urna', 'Proporcionar un ataúd o urna para el cuerpo del animal fallecido.'),
('Entrega al dueño', 'Entrega del cuerpo del animal fallecido al dueño para su despedida.');
INSERT INTO estado_plan (estado) VALUES
('Activo'),
('Suspendido'),
('Pendiente'),
('Finalizado');
INSERT INTO tipo_afiliacion (plan_usuario) VALUES
('Básico'),
('Premium'),
('VIP'),
('Estándar'),
('Personalizado');
INSERT INTO usuario (nombre_usuario, telefono_contacto, documento) VALUES
('Juan Pérez', 311234567, 12345678),
('María Gómez', 322987654, 98765432),
('Pedro Ramírez', 300123456, 56789123),
('Ana Rodríguez', 310987654, 23456789),
('Luisa Martínez', 320876543, 87654321),
('Carlos Sánchez', 301234567, 34567890);
INSERT INTO mascota (nombre_mascota, edad_mascota, fk_dueño, fk_raza) VALUES
('Rocky', 3, 1, 1),
('Boris', 6, 1, 1),
('Luna', 5, 2, 2),
('Max', 2, 3, 3),
('Bella', 4, 4, 4),
('Toby', 6, 5, 5),
('Lola', 1, 6, 6);
INSERT INTO plan (fecha_afiliacion, fk_estado_plan, fk_tipo_afiliacion, fk_usuario) VALUES
('2023-07-15 08:30:00', 1, 1, 1),
('2023-07-20 11:45:00', 2, 2, 2),
('2023-07-25 14:00:00', 1, 3, 3),
('2023-07-30 16:15:00', 2, 2, 4),
('2023-08-02 09:30:00', 1, 1, 5),
('2023-08-10 12:45:00', 2, 3, 6);
INSERT INTO seguimiento (fk_procedimiento, fk_mascota, fecha_inicio, fecha_final_apreciada) VALUES
(1, 1, '2023-07-15 10:00:00', '2023-07-30 12:00:00'),
(2, 3, '2023-07-20 09:30:00', '2023-08-15 10:30:00'),
(3, 2, '2023-07-25 14:15:00', '2023-07-25 15:45:00'),
(1, 4, '2023-07-28 08:45:00', '2023-08-10 09:00:00'),
(3, 6, '2023-07-29 11:30:00', '2023-07-28 14:15:00'),
(2, 5, '2023-08-01 12:00:00', '2023-08-02 11:20:00');

SELECT plan.id_plan AS "id", usuario.nombre_usuario AS "usuario", tipo_afiliacion.plan_usuario AS "plan", estado_plan.estado AS "estado", plan.fecha_afiliacion AS "fecha_inicio", (SELECT COUNT(*) FROM mascota WHERE mascota.fk_dueño = usuario.id_usuario) AS "Numero_mascotas" FROM plan INNER JOIN usuario ON plan.fk_usuario = usuario.id_usuario INNER JOIN estado_plan ON plan.fk_estado_plan = estado_plan.id_estado INNER JOIN tipo_afiliacion ON plan.fk_tipo_afiliacion = tipo_afiliacion.id_afiliacion WHERE fk_usuario = 1;

SELECT u.id_usuario, u.nombre_usuario, COUNT(p.fk_usuario) AS cantidad_mascotas
FROM usuario u
LEFT JOIN plan p ON u.id_usuario = p.fk_usuario
GROUP BY u.id_usuario, u.nombre_usuario;
