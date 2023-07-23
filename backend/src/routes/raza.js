import { Router } from "express";
import proxyRaza from "./../middleware/middleware_raza.js"
import mysql from "mysql2";
import { SignJWT, jwtVerify } from 'jose';
import session from 'express-session';

let con = undefined;
const routerRaza = Router();

routerRaza.use(session({secret:'mi-secreto', resave: false,saveUninitialized: true}));

routerRaza.use("/:id?", async (req, res, next) => {
    try {  
        const encoder = new TextEncoder(); 
        const payload = { body: req.body, params: req.params };
        const jwt = await new SignJWT(payload)
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("20s")
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
        req.session.jwt = jwt;
        res.cookie('raza', jwt , {httpOnly : true});
        next();
    } catch (err) {
        console.error('Error al generar el JWT:', err.message);
        res.sendStatus(500);
    }
});

routerRaza.use((req,res,next)=>{
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
});

routerRaza.get("/:id?", proxyRaza, async(req, res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    let sql = (jwtData.payload.params.id)
    ? [`SELECT raza.id_raza AS "id", raza.nombre_raza AS "raza", especie.nombre_especie AS "especie" FROM raza INNER JOIN especie ON raza.fk_especie = especie.id_especie WHERE id_raza = ?`, jwtData.payload.params.id]
    : [`SELECT raza.id_raza AS "id", raza.nombre_raza AS "raza", especie.nombre_especie AS "especie" FROM raza INNER JOIN especie ON raza.fk_especie = especie.id_especie ORDER BY raza`];
    con.query(...sql, (err, data)=>{
        if(err){
            console.error("ocurrió un error intentando traer los datos de razas", err.message);
            res.status(err.status)
        } else {
            res.send(data);
        }
    })
    
})
routerRaza.post("/", proxyRaza, async (req,res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`INSERT INTO raza SET ?`, jwtData.payload.body, (err,info)=>{
        if(err){
            console.error("error insertando datos en razas", err.message);
            res.status(err.status)
        } else {
            res.send(info)
        }

    })
})
routerRaza.put("/:id", proxyRaza, async (req, res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`UPDATE raza SET ? WHERE id_raza = ?`, [jwtData.payload.body, jwtData.payload.params.id], (err, info)=>{
        if (err) {
            console.error("error actualizando los datos en razas", err.message);
            res.status(err.status)
        } else {
            res.send(info);
        }
    });
});

routerRaza.delete("/:id", proxyRaza, async (req, res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`DELETE FROM raza WHERE id_raza = ?`, jwtData.payload.params.id, (err,info)=>{
        if(err) {
            console.error(`error eliminando la raza con id ${req.params.id}: `, err.message);
            res.status(err.status)
        } else {
            res.send(info);
        }
    })
})
export default routerRaza;