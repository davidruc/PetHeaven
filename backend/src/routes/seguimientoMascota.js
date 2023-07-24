import { Router } from "express";
import proxySeguimiento from "./../middleware/middleware_seguimiento.js"
import mysql from "mysql2";
import { SignJWT, jwtVerify } from 'jose';
import session from 'express-session';

let con = undefined;
const routerSegMascota = Router();

routerSegMascota.use(session({secret:'mi-secreto', resave: false,saveUninitialized: true}));

routerSegMascota.use("/:id?", async (req, res, next) => {
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

routerSegMascota.use((req,res,next)=>{
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
});

routerSegMascota.get("/:id?", proxySeguimiento, async(req, res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    let sql = (jwtData.payload.params.id)
    ? [`SELECT 
        mascota.nombre_mascota AS "nombre_mascota",
        usuario.nombre_usuario AS "nombre_dueño",
        estado_plan.estado AS "estado_plan",
        tipo_afiliacion.plan_usuario AS "plan_adquirido",
        procedimiento.name_procedimiento AS "procedimiento_mascota",
        seguimiento.fecha_inicio AS "fecha_inicio_seguimiento",
        seguimiento.fecha_final_apreciada AS "fecha_final_apreciada_seguimiento"
        FROM seguimiento
        INNER JOIN mascota ON seguimiento.fk_mascota = mascota.id_mascota
        INNER JOIN usuario ON mascota.fk_dueño = usuario.id_usuario
        INNER JOIN plan ON usuario.id_usuario = plan.fk_usuario
        INNER JOIN estado_plan ON plan.fk_estado_plan = estado_plan.id_estado
        INNER JOIN tipo_afiliacion ON plan.fk_tipo_afiliacion = tipo_afiliacion.id_afiliacion
        INNER JOIN procedimiento ON seguimiento.fk_procedimiento = procedimiento.id_procedimiento_mascota
        WHERE seguimiento.fk_mascota = ?`, jwtData.payload.params.id]
    : [`SELECT 
        mascota.nombre_mascota AS "nombre_mascota",
        usuario.nombre_usuario AS "nombre_dueño",
        estado_plan.estado AS "estado_plan",
        tipo_afiliacion.plan_usuario AS "plan_adquirido",
        procedimiento.name_procedimiento AS "procedimiento_mascota",
        seguimiento.fecha_inicio AS "fecha_inicio_seguimiento",
        seguimiento.fecha_final_apreciada AS "fecha_final_apreciada_seguimiento"
        FROM seguimiento
        INNER JOIN mascota ON seguimiento.fk_mascota = mascota.id_mascota
        INNER JOIN usuario ON mascota.fk_dueño = usuario.id_usuario
        INNER JOIN plan ON usuario.id_usuario = plan.fk_usuario
        INNER JOIN estado_plan ON plan.fk_estado_plan = estado_plan.id_estado
        INNER JOIN tipo_afiliacion ON plan.fk_tipo_afiliacion = tipo_afiliacion.id_afiliacion
        INNER JOIN procedimiento ON seguimiento.fk_procedimiento = procedimiento.id_procedimiento_mascota`];
    con.query(...sql, (err, data)=>{
        if(err){
            console.error("ocurrió un error intentando traer los datos de mascotas", err.message);
            res.status(err.status)
        } else {
            res.send(data);
        }
    })
    
})

export default routerSegMascota;