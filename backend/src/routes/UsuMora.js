import { Router } from "express";
import mysql from "mysql2";

let con = undefined;
const routerUsuarioMora = Router();

routerUsuarioMora.use((req,res,next)=>{
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
});

routerUsuarioMora.get("/", async(req, res)=>{
    con.query(`SELECT plan.id_plan AS "id_plan", usuario.nombre_usuario AS "usuario",usuario.telefono_contacto AS "contacto", tipo_afiliacion.plan_usuario AS "plan", estado_plan.estado AS "estado", (SELECT mascota.nombre_mascota FROM mascota WHERE mascota.fk_dueño = usuario.id_usuario ORDER BY mascota.edad_mascota LIMIT 1) AS "mascota"  FROM plan INNER JOIN usuario ON plan.fk_usuario = usuario.id_usuario INNER JOIN estado_plan ON plan.fk_estado_plan = estado_plan.id_estado INNER JOIN tipo_afiliacion ON plan.fk_tipo_afiliacion = tipo_afiliacion.id_afiliacion WHERE fk_estado_plan = 3`, (err, data)=>{
        if(err){
            console.error("ocurrió un error intentando traer los datos ", err.message);
            res.status(err.status)
        } else {
            res.send(data);
        }
    })
    
})

export default routerUsuarioMora;