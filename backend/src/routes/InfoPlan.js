import { Router } from "express";
import proxyPlan from "./../middleware/middleware_plan.js"
import mysql from "mysql2";
import { SignJWT, jwtVerify } from 'jose';
import session from 'express-session';

let con = undefined;
const routerInfoPlan = Router();

routerInfoPlan.use(session({secret:'mi-secreto', resave: false,saveUninitialized: true}));

routerInfoPlan.use("/:id?", async (req, res, next) => {
    try {  
        const encoder = new TextEncoder(); 
        const payload = { body: req.body, params: req.params };
        const jwt = await new SignJWT(payload)
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("20s")
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
        req.session.jwt = jwt;
        res.cookie('InfoPlan', jwt , {httpOnly : true});
        next();
    } catch (err) {
        console.error('Error al generar el JWT:', err.message);
        res.sendStatus(500);
    }
});

routerInfoPlan.use((req,res,next)=>{
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
});

routerInfoPlan.get("/:id?", proxyPlan, async(req, res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    let sql = (jwtData.payload.params.id)
    ? [`SELECT plan.id_plan AS "id_plan", usuario.nombre_usuario AS "usuario", tipo_afiliacion.plan_usuario AS "plan", estado_plan.estado AS "estado", plan.fecha_afiliacion AS "fecha_inicio", (SELECT COUNT(*) FROM mascota WHERE mascota.fk_dueño = usuario.id_usuario) AS "Numero_mascotas" FROM plan INNER JOIN usuario ON plan.fk_usuario = usuario.id_usuario INNER JOIN estado_plan ON plan.fk_estado_plan = estado_plan.id_estado INNER JOIN tipo_afiliacion ON plan.fk_tipo_afiliacion = tipo_afiliacion.id_afiliacion WHERE fk_usuario = ?`, jwtData.payload.params.id]
    : [`SELECT plan.id_plan AS "id_plan", usuario.nombre_usuario AS "usuario", tipo_afiliacion.plan_usuario AS "plan", estado_plan.estado AS "estado", plan.fecha_afiliacion AS "fecha_inicio", (SELECT COUNT(*) FROM mascota WHERE mascota.fk_dueño = usuario.id_usuario) AS "Numero_mascotas" FROM plan INNER JOIN usuario ON plan.fk_usuario = usuario.id_usuario INNER JOIN estado_plan ON plan.fk_estado_plan = estado_plan.id_estado INNER JOIN tipo_afiliacion ON plan.fk_tipo_afiliacion = tipo_afiliacion.id_afiliacion`];
    con.query(...sql, (err, data)=>{
        if(err){
            console.error("ocurrió un error intentando traer los datos ", err.message);
            res.status(err.status)
        } else {
            res.send(data);
        }
    })
    
})

export default routerInfoPlan;