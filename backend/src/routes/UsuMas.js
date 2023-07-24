import { Router } from "express";
import proxyMascota from "./../middleware/middleware_mascota.js"
import mysql from "mysql2";
import { SignJWT, jwtVerify } from 'jose';
import session from 'express-session';

let con = undefined;
const routerUsuMascotas = Router();

routerUsuMascotas.use(session({secret:'mi-secreto', resave: false,saveUninitialized: true}));

routerUsuMascotas.use("/:id?", async (req, res, next) => {
    try {  
        const encoder = new TextEncoder();
        const payload = { body: req.body, params: req.params };
        const jwt = await new SignJWT(payload)
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("20s")
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
        req.session.jwt = jwt;
        res.cookie('mascotasXusuario', jwt , {httpOnly : true});
        next();
    } catch (err) {
        console.error('Error al generar el JWT:', err.message);
        res.sendStatus(500);
    }
});

routerUsuMascotas.use((req,res,next)=>{
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
});

routerUsuMascotas.get("/:id?", proxyMascota, async(req, res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    let sql = (jwtData.payload.params.id)
    ? [`SELECT mascota.id_mascota AS "id", mascota.nombre_mascota AS "mascota", mascota.edad_mascota AS "edad", mascota.fk_dueño AS "id_dueño", usuario.nombre_usuario AS "nombre_dueño", especie.nombre_especie AS "especie",raza.nombre_raza AS "raza" FROM mascota INNER JOIN raza ON mascota.fk_raza = raza.id_raza INNER JOIN usuario ON mascota.fk_dueño = usuario.id_usuario INNER JOIN especie ON raza.fk_especie = especie.id_especie WHERE fk_dueño = ?`, jwtData.payload.params.id]
    : [`SELECT mascota.id_mascota AS "id", mascota.nombre_mascota AS "mascota", mascota.edad_mascota AS "edad", mascota.fk_dueño AS "id_dueño", usuario.nombre_usuario AS "nombre_dueño", especie.nombre_especie AS "especie",raza.nombre_raza AS "raza" FROM mascota INNER JOIN raza ON mascota.fk_raza = raza.id_raza INNER JOIN usuario ON mascota.fk_dueño = usuario.id_usuario INNER JOIN especie ON raza.fk_especie = especie.id_especie`];
    con.query(...sql, (err, data)=>{
        if(err){
            console.error("ocurrió un error intentando traer los datos de mascotas", err.message);
            res.status(err.status)
        } else {
            res.send(data);
        }
    })
    
})

export default routerUsuMascotas;