import { Router } from "express";
import proxySeguimiento from "./../middleware/middleware_seguimiento.js"
import mysql from "mysql2";
import { SignJWT, jwtVerify } from 'jose';
import session from 'express-session';

let con = undefined;
const routerSeguimiento = Router();

routerSeguimiento.use(session({secret:'mi-secreto', resave: false,saveUninitialized: true}));

routerSeguimiento.use("/:id?", async (req, res, next) => {
    try {  
        const encoder = new TextEncoder(); 
        const payload = { body: req.body, params: req.params };
        const jwt = await new SignJWT(payload)
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("20s")
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
        req.session.jwt = jwt;
        res.cookie('seguimiento', jwt , {httpOnly : true});
        next();
    } catch (err) {
        console.error('Error al generar el JWT:', err.message);
        res.sendStatus(500);
    }
});

routerSeguimiento.use((req,res,next)=>{
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
});

routerSeguimiento.get("/:id?", proxySeguimiento, async(req, res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    let sql = (jwtData.payload.params.id)
    ? [`SELECT * FROM seguimiento WHERE id_seguimiento_mascota = ?`, jwtData.payload.params.id]
    : [`SELECT * FROM seguimiento`];
    con.query(...sql, (err, data)=>{
        if(err){
            console.error("ocurrió un error intentando traer los datos del tipo de seguimientoes", err.message);
            res.status(err.status)
        } else {
            res.send(data);
        }
    })
    
})
routerSeguimiento.post("/", proxySeguimiento, async (req,res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`INSERT INTO seguimiento SET ?`, jwtData.payload.body, (err,info)=>{
        if(err){
            console.error("error insertando datos en seguimientoes", err.message);
            res.status(err.status)
        } else {
            res.send(info)
        }
    })
})
routerSeguimiento.put("/:id", proxySeguimiento, async (req, res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`UPDATE seguimiento SET ? WHERE id_seguimiento_mascota = ?`, [jwtData.payload.body, jwtData.payload.params.id], (err, info)=>{
        if (err) {
            console.error("error actualizando los datos en seguimientoes", err.message);
            res.status(err.status)
        } else {
            res.send(info);
        }
    });
});

routerSeguimiento.delete("/:id", proxySeguimiento, async (req, res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`DELETE FROM seguimiento WHERE id_seguimiento_mascota = ?`, jwtData.payload.params.id, (err,info)=>{
        if(err) {
            console.error(`error eliminando el tipo de seguimiento con id ${req.params.id}: `, err.message);
            res.status(err.status)
        } else {
            res.send(info);
        }
    })
})
export default routerSeguimiento;