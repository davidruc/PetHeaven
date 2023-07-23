import { Router } from "express";
import proxyUsuario from "./../middleware/middleware_usuario.js"
import mysql from "mysql2";
import { SignJWT, jwtVerify } from 'jose';
import session from 'express-session';

let con = undefined;
const routerUsuario = Router();

routerUsuario.use(session({secret:'mi-secreto', resave: false,saveUninitialized: true}));

routerUsuario.use("/:id?", async (req, res, next) => {
    try {  
        const encoder = new TextEncoder(); 
        const payload = { body: req.body, params: req.params };
        const jwt = await new SignJWT(payload)
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("20s")
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
        req.session.jwt = jwt;
        res.cookie('usuario', jwt , {httpOnly : true});
        next();
    } catch (err) {
        console.error('Error al generar el JWT:', err.message);
        res.sendStatus(500);
    }
});

routerUsuario.use((req,res,next)=>{
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
});

routerUsuario.get("/:id?", proxyUsuario, async(req, res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    let sql = (jwtData.payload.params.id)
    ? [`SELECT usuario.id_usuario AS "id", usuario.nombre_usuario AS "usuario", usuario.telefono_contacto AS "telefono", usuario.documento FROM usuario WHERE id_usuario = ?`, jwtData.payload.params.id]
    : [`SELECT usuario.id_usuario AS "id", usuario.nombre_usuario AS "usuario", usuario.telefono_contacto AS "telefono", usuario.documento FROM usuario`];
    con.query(...sql, (err, data)=>{
        if(err){
            console.error("ocurrió un error intentando traer los datos de usuarios", err.message);
            res.status(err.status)
        } else {
            res.send(data);
        }
    })
    
})
routerUsuario.post("/", proxyUsuario, async (req,res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    console.log(jwtData.payload.body);
    con.query(`INSERT INTO usuario SET ?`, jwtData.payload.body, (err,info)=>{
        if(err){
            console.error("error insertando datos en usuarios", err.message);
            res.status(err.status)
        } else {
            res.send(info)
        }

    })
})
routerUsuario.put("/:id", proxyUsuario, async (req, res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`UPDATE usuario SET ? WHERE id_usuario = ?`, [jwtData.payload.body, jwtData.payload.params.id], (err, info)=>{
        if (err) {
            console.error("error actualizando los datos en usuarios", err.message);
            res.status(err.status)
        } else {
            res.send(info);
        }
    });
});

routerUsuario.delete("/:id", proxyUsuario, async (req, res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`DELETE FROM usuario WHERE id_usuario = ?`, jwtData.payload.params.id, (err,info)=>{
        if(err) {
            console.error(`error eliminando la usuario con id ${req.params.id}: `, err.message);
            res.status(err.status)
        } else {
            res.send(info);
        }
    })
})
export default routerUsuario;