import express  from "express";
import "reflect-metadata";
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";
import {Plan} from "./../controller/Plan.js";
import {parametros} from "./../controller/parametros.js"
import { jwtVerify } from "jose";

const proxyPlan = express();
proxyPlan.use(async(req, res, next)=>{
    try{
        const jwt = req.session.jwt;
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            jwt,
            encoder.encode(process.env.JWT_PRIVATE_KEY)
            )
        if (jwtData.payload.params.id) {
            let parametro = plainToClass(parametros, jwtData.payload.params, {excludeExtraneousValues: true})
            await validate(parametro);
        }
        if (req.method === 'POST' || req.method === 'PUT'){
            let data = plainToClass(Plan, jwtData.payload.body, {excludeExtraneousValues: true}); 
            await validate(data);
        }
        next();
    } catch(err) {
        const statusCode = err.status || 500;
        const errorMessage = err.message || 'Ha ocurrido un error en el servidor.';
        res.status(statusCode).send(errorMessage);
    }
})

export default proxyPlan;