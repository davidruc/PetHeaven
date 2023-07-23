import { Router } from "express";
import proxyProcedimiento from "./../middleware/middleware_procedimiento.js"
import mysql from "mysql2";
import { SignJWT, jwtVerify } from 'jose';
import session from 'express-session';

let con = undefined;
const routerProcedimiento = Router();

routerProcedimiento.use(session({secret:'mi-secreto', resave: false,saveUninitialized: true}));

routerProcedimiento.use("/:id?", async (req, res, next) => {
    try {  
        const encoder = new TextEncoder(); 
        const payload = { body: req.body, params: req.params };
        const jwt = await new SignJWT(payload)
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("20s")
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
        req.session.jwt = jwt;
        res.cookie('procedimiento', jwt , {httpOnly : true});
        next();
    } catch (err) {
        console.error('Error al generar el JWT:', err.message);
        res.sendStatus(500);
    }
});

routerProcedimiento.use((req,res,next)=>{
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
});

routerProcedimiento.get("/:id?", proxyProcedimiento, async(req, res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    let sql = (jwtData.payload.params.id)
    ? [`SELECT * FROM procedimiento WHERE id_procedimiento_mascota = ?`, jwtData.payload.params.id]
    : [`SELECT * FROM procedimiento`];
    con.query(...sql, (err, data)=>{
        if(err){
            console.error("ocurrió un error intentando traer los datos de procedimientos", err.message);
            res.status(err.status)
        } else {
            res.send(data);
        }
    })
    
})
routerProcedimiento.post("/", proxyProcedimiento, async (req,res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`INSERT INTO procedimiento SET ?`, jwtData.payload.body, (err,info)=>{
        if(err){
            console.error("error insertando datos en procedimientos", err.message);
            res.status(err.status)
        } else {
            res.send(info)
        }

    })
})
routerProcedimiento.put("/:id", proxyProcedimiento, async (req, res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`UPDATE procedimiento SET ? WHERE id_procedimiento_mascota = ?`, [jwtData.payload.body, jwtData.payload.params.id], (err, info)=>{
        if (err) {
            console.error("error actualizando los datos en procedimientos", err.message);
            res.status(err.status)
        } else {
            res.send(info);
        }
    });
});

routerProcedimiento.delete("/:id", proxyProcedimiento, async (req, res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`DELETE FROM procedimiento WHERE id_procedimiento_mascota = ?`, jwtData.payload.params.id, (err,info)=>{
        if(err) {
            console.error(`error eliminando el procedimiento con id ${req.params.id}: `, err.message);
            res.status(err.status)
        } else {
            res.send(info);
        }
    })
})
export default routerProcedimiento;