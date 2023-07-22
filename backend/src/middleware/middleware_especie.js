import express  from "express";
import "reflect-metadata";
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";
import {Especie} from "./../controller/Especie.js";
import {parametros} from "./../controller/parametros.js"
import { jwtVerify } from "jose";

const proxyEspecie = express();
proxyEspecie.use(async(req, res, next)=>{
    try{
        const jwt = req.cookies.especie;
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            jwt,
            encoder.encode(process.env.JWT_PRIVATE_KEY)
        )    
        if (jwtData.payload) {
            let parametro = plainToClass(parametros, jwtData.payload, {excludeExtraneousValues: true})
            await validate(parametro);
            console.log("entramos a parámetros", parametro);
        }
        if (req.method === 'POST' || req.method === 'PUT'){
            console.log(req.method);
            let data = plainToClass(Especie, jwtData.payload, {excludeExtraneousValues: true});
            await validate(data);
            console.log(data);
        }
        next();
    } catch(err) {
        const statusCode = err.status || 500;
        const errorMessage = err.message || 'Ha ocurrido un error en el servidor.';
        res.status(statusCode).send(errorMessage);
    }
})

export default proxyEspecie;