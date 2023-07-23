import { Router } from "express";
import proxyEstadoPlan from "./../middleware/middleware_estado.js"
import mysql from "mysql2";
import { SignJWT, jwtVerify } from 'jose';
import session from 'express-session';

let con = undefined;
const routerEstadoPlan = Router();

routerEstadoPlan.use(session({secret:'mi-secreto', resave: false,saveUninitialized: true}));

routerEstadoPlan.use("/:id?", async (req, res, next) => {
    try {  
        const encoder = new TextEncoder(); 
        const payload = { body: req.body, params: req.params };
        const jwt = await new SignJWT(payload)
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("20s")
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
        req.session.jwt = jwt;
        res.cookie('estado', jwt , {httpOnly : true});
        next();
    } catch (err) {
        console.error('Error al generar el JWT:', err.message);
        res.sendStatus(500);
    }
});

routerEstadoPlan.use((req,res,next)=>{
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
});

routerEstadoPlan.get("/:id?", proxyEstadoPlan, async(req, res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    let sql = (jwtData.payload.params.id)
    ? [`SELECT * FROM estado_plan WHERE id_estado = ?`, jwtData.payload.params.id]
    : [`SELECT * FROM estado_plan`];
    con.query(...sql, (err, data)=>{
        if(err){
            console.error("ocurrió un error intentando traer los datos del tipo de estadoes", err.message);
            res.status(err.status)
        } else {
            res.send(data);
        }
    })
    
})
routerEstadoPlan.post("/", proxyEstadoPlan, async (req,res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`INSERT INTO estado_plan SET ?`, jwtData.payload.body, (err,info)=>{
        if(err){
            console.error("error insertando datos en estadoes", err.message);
            res.status(err.status)
        } else {
            res.send(info)
        }
    })
})
routerEstadoPlan.put("/:id", proxyEstadoPlan, async (req, res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`UPDATE estado_plan SET ? WHERE id_estado = ?`, [jwtData.payload.body, jwtData.payload.params.id], (err, info)=>{
        if (err) {
            console.error("error actualizando los datos en estadoes", err.message);
            res.status(err.status)
        } else {
            res.send(info);
        }
    });
});

routerEstadoPlan.delete("/:id", proxyEstadoPlan, async (req, res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`DELETE FROM estado_plan WHERE id_estado = ?`, jwtData.payload.params.id, (err,info)=>{
        if(err) {
            console.error(`error eliminando el tipo de estado con id ${req.params.id}: `, err.message);
            res.status(err.status)
        } else {
            res.send(info);
        }
    })
})
export default routerEstadoPlan;