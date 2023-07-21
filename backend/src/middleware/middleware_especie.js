import express  from "express";
import "reflect-metadata";
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";
import {Especie} from "./../controller/Especie.js";
import {parametros} from "./../controller/parametros.js"

const proxyEspecie = express();

proxyEspecie.use("/:id?", async(req, res, next)=>{
    try{
        if (req.params.id) {
            let parametro = plainToClass(parametros, req.params, {excludeExtraneousValues: true})
            await validate(parametro);
            console.log("entramos a parámetros", parametro);
        }
        if (req.method === 'POST' || req.method === 'PUT'){
            console.log(req.method);
            let data = plainToClass(Especie, req.body, {excludeExtraneousValues: true});
            await validate(data);
            console.log(data);
        }
        next();
    } catch(err) {
        res.status(err.status).send(err);
    }
})

export default proxyEspecie;