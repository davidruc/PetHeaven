import { Router } from "express";
import proxyPlan from "./../middleware/middleware_plan.js"
import mysql from "mysql2";
import { SignJWT, jwtVerify } from 'jose';
import session from 'express-session';

let con = undefined;
const routerPlan = Router();

routerPlan.use(session({secret:'mi-secreto', resave: false,saveUninitialized: true}));

routerPlan.use("/:id?", async (req, res, next) => {
    try {  
        const encoder = new TextEncoder(); 
        const payload = { body: req.body, params: req.params };
        const jwt = await new SignJWT(payload)
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("20s")
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
        req.session.jwt = jwt;
        res.cookie('plan', jwt , {httpOnly : true});
        next();
    } catch (err) {
        console.error('Error al generar el JWT:', err.message);
        res.sendStatus(500);
    }
});

routerPlan.use((req,res,next)=>{
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
});

routerPlan.get("/:id?", proxyPlan, async(req, res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    let sql = (jwtData.payload.params.id)
    ? [`SELECT * FROM plan WHERE id_plan = ?`, jwtData.payload.params.id]
    : [`SELECT * FROM plan`];
    con.query(...sql, (err, data)=>{
        if(err){
            console.error("ocurrió un error intentando traer los datos de plans", err.message);
            res.status(err.status)
        } else {
            res.send(data);
        }
    })
    
})
routerPlan.post("/", proxyPlan, async (req,res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`INSERT INTO plan SET ?`, jwtData.payload.body, (err,info)=>{
        if(err){
            console.error("error insertando datos en planes", err.message);
            res.status(err.status)
        } else {
            res.send(info)
        }

    })
})
routerPlan.put("/:id", proxyPlan, async (req, res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`UPDATE plan SET ? WHERE id_plan = ?`, [jwtData.payload.body, jwtData.payload.params.id], (err, info)=>{
        if (err) {
            console.error("error actualizando los datos en planes", err.message);
            res.status(err.status)
        } else {
            res.send(info);
        }
    });
});

routerPlan.delete("/:id", proxyPlan, async (req, res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`DELETE FROM plan WHERE id_plan = ?`, jwtData.payload.params.id, (err,info)=>{
        if(err) {
            console.error(`error eliminando el plan con id ${req.params.id}: `, err.message);
            res.status(err.status)
        } else {
            res.send(info);
        }
    })
})
export default routerPlan;