import { Router } from "express";
import proxyEspecie from "./../middleware/middleware_especie.js"
import mysql from "mysql2";
import { SignJWT, jwtVerify } from 'jose';
//Se agrega la dependencia express-session para poder realizar la persistencia de los datos.
import session from 'express-session';

let con = undefined;
const routerEspecie = Router();

//Se crea la session 
routerEspecie.use(session({secret:'mi-secreto', resave: false,saveUninitialized: true}));

routerEspecie.use("/:id?", async (req, res, next) => {
    try {  
        const encoder = new TextEncoder(); 
        const payload = { body: req.body, params: req.params };
        const jwt = await new SignJWT(payload)
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("20s")
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
          // Se almacena el jwt en la variable de sesión para que el valor que envíe a la cookie sea el de la sesion
        req.session.jwt = jwt;
        res.cookie('especie', jwt , {httpOnly : true});
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
    // Obtener el JWT de la variable de sesión
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    let sql = (jwtData.payload.params.id)
    ? [`SELECT * FROM especie WHERE id_especie = ?`, jwtData.payload.params.id]
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
routerEspecie.post("/", proxyEspecie, async (req,res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`INSERT INTO especie SET ?`, jwtData.payload.body, (err,info)=>{
        if(err){
            console.error("error insertando datos en especies", err.message);
            res.status(err.status)
        } else {
            res.send(info)
        }

    })
})
routerEspecie.put("/:id", proxyEspecie, async (req, res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`UPDATE especie SET ? WHERE id_especie = ?`, [jwtData.payload.body, jwtData.payload.params.id], (err, info)=>{
        if (err) {
            console.error("error actualizando los datos en especies", err.message);
            res.status(err.status)
        } else {
            res.send(info);
        }
    });
});

routerEspecie.delete("/:id", proxyEspecie, async (req, res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`DELETE FROM especie WHERE id_especie = ?`, jwtData.payload.params.id, (err,info)=>{
        if(err) {
            console.error(`error eliminando la especie con id ${req.params.id}: `, err.message);
            res.status(err.status)
        } else {
            res.send(info);
        }
    })
})
export default routerEspecie;