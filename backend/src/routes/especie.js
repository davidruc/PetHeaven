import { Router } from "express";
import proxyEspecie from "./../middleware/middleware_especie.js"
import mysql from "mysql2";
import { SignJWT, jwtVerify } from 'jose';
import { signedCookie, signedCookies } from "cookie-parser";

let con = undefined;
const routerEspecie = Router();

routerEspecie.use("/:id?", async (req, res, next) => {
    try {  
        const encoder = new TextEncoder(); 
        console.log(encoder);
        const jwtconstructor = new SignJWT(req.params);
        console.log(jwtconstructor);
        const jwt = await jwtconstructor 
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("20s")
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
        console.log(jwt);
        res.cookie('especie', jwt , {httpOnly : true});
        console.log(req.cookies);
        next();
    } catch (err) {
        console.error('Error al generar el JWT:', err.message);
        res.sendStatus(500);
    }
});

routerEspecie.use((req,res,next)=>{
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
});

routerEspecie.get("/:id?", proxyEspecie, async(req, res)=>{
    console.log("en mi funcion get ");
    const jwt = req.cookies.especie; 

    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    console.log(jwtData);

    let sql = (jwtData.payload.id)
    ? [`SELECT * FROM especie WHERE id_especie = ?`, jwtData.payload.id]
    : [`SELECT * FROM especie`];
    con.query(...sql, (err, data)=>{
        if(err){
            console.error("ocurrió un error intentando traer los datos de especies", err.message);
            res.status(err.status)
        } else {
            res.send(data);
        }
    })
    
})
routerEspecie.post("/", proxyEspecie,  (req,res)=>{
    con.query(`INSERT INTO especie SET ?`, req.body, (err,info)=>{
        if(err){
            console.error("error insertando datos en especies", err.message);
            res.status(err.status)
        } else {
            res.send(info)
        }

    })
})
routerEspecie.put("/:id", proxyEspecie, (req, res)=>{
    con.query(`UPDATE especie SET ? WHERE id_especie = ?`, [req.body, req.params.id], (err, info)=>{
        if (err) {
            console.error("error actualizando los datos en especies", err.message);
            res.status(err.status)
        } else {
            res.send(info);
        }
    });
});

routerEspecie.delete("/:id", proxyEspecie, (req, res)=>{
    con.query(`DELETE FROM especie WHERE id_especie = ?`, req.params.id, (err,info)=>{
        if(err) {
            console.error(`error eliminando la especie con id ${req.params.id}: `, err.message);
            res.status(err.status)
        } else {
            res.send(info);
        }
    })
})
export default routerEspecie;