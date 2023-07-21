import { Router } from "express";
import proxyEspecie from "./../middleware/middleware_especie.js"
import mysql from "mysql2";

let con = undefined;
const routerEspecie = Router();

routerEspecie.use((req,res,next)=>{
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
});

routerEspecie.get("/:id?", proxyEspecie, (req, res)=>{
    let sql = (req.params.id)
    ? [`SELECT * FROM especie WHERE id_especie = ?`, req.params.id]
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