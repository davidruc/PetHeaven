import { Router } from "express";
import proxyAfiliacion from "./../middleware/middleware_afiliacion.js"
import mysql from "mysql2";
import { SignJWT, jwtVerify } from 'jose';
import session from 'express-session';

let con = undefined;
const routerAfiliacion = Router();

routerAfiliacion.use(session({secret:'mi-secreto', resave: false,saveUninitialized: true}));

routerAfiliacion.use("/:id?", async (req, res, next) => {
    try {  
        const encoder = new TextEncoder(); 
        const payload = { body: req.body, params: req.params };
        const jwt = await new SignJWT(payload)
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("20s")
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
        req.session.jwt = jwt;
        res.cookie('afiliacion', jwt , {httpOnly : true});
        next();
    } catch (err) {
        console.error('Error al generar el JWT:', err.message);
        res.sendStatus(500);
    }
});

routerAfiliacion.use((req,res,next)=>{
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
});

routerAfiliacion.get("/:id?", proxyAfiliacion, async(req, res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    let sql = (jwtData.payload.params.id)
    ? [`SELECT * FROM tipo_afiliacion WHERE id_afiliacion = ?`, jwtData.payload.params.id]
    : [`SELECT * FROM tipo_afiliacion`];
    con.query(...sql, (err, data)=>{
        if(err){
            console.error("ocurrió un error intentando traer los datos del tipo de afiliaciones", err.message);
            res.status(err.status)
        } else {
            res.send(data);
        }
    })
    
})
routerAfiliacion.post("/", proxyAfiliacion, async (req,res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`INSERT INTO tipo_afiliacion SET ?`, jwtData.payload.body, (err,info)=>{
        if(err){
            console.error("error insertando datos en afiliaciones", err.message);
            res.status(err.status)
        } else {
            res.send(info)
        }
    })
})
routerAfiliacion.put("/:id", proxyAfiliacion, async (req, res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`UPDATE tipo_afiliacion SET ? WHERE id_afiliacion = ?`, [jwtData.payload.body, jwtData.payload.params.id], (err, info)=>{
        if (err) {
            console.error("error actualizando los datos en afiliaciones", err.message);
            res.status(err.status)
        } else {
            res.send(info);
        }
    });
});

routerAfiliacion.delete("/:id", proxyAfiliacion, async (req, res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`DELETE FROM tipo_afiliacion WHERE id_afiliacion = ?`, jwtData.payload.params.id, (err,info)=>{
        if(err) {
            console.error(`error eliminando el tipo de afiliacion con id ${req.params.id}: `, err.message);
            res.status(err.status)
        } else {
            res.send(info);
        }
    })
})
export default routerAfiliacion;