import {Expose,Type,Transform} from "class-transformer";
import {IsInt, IsDefined, MinLength ,MaxLength, Length} from "class-validator";
import "reflect-metadata";

export class Procedimiento{
    @IsInt()
    @Expose({ name: 'id_procedimiento_mascota' })
    @Transform(({value})=>{
        if(/^[0-9]+$/.test(value) || typeof value == "undefined") 
        return (value); else throw {status:400, message: "el dato del id ingresado es incorrecto, ingresa un número entero"}}, {toClassOnly: true})
    id_procedimiento_mascota: number;
    @IsDefined()
    @MinLength(1, {message: ()=>{throw {status: 401, message: `El nombre del procedimiento debe contener almenos un caracter`}}})
    @MaxLength(50, {message: ()=>{throw {status: 401, message: `El nombre del procedimiento no puede superar los 50 caracteres`}}}) 
    @Expose({name: "name_procedimiento"})
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ]+$/.test(value)) return value; else throw {status: 400, message:`El dato nombre del procedimiento incumple los parametros acordados`};},{ toClassOnly: true})
    name_procedimiento: String;
    @MinLength(1, {message: ()=>{throw {status: 401, message: `los detalles del procedimiento debe contener almenos un caracter`}}})
    @MaxLength(255, {message: ()=>{throw {status: 401, message: `los detalles del procedimiento no puede superar los 255 caracteres`}}}) 
    @Expose({name: "detalles"})
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ]+$/.test(value)) return value; else throw {status: 400, message:`El campo detalles incumple los parametros acordados`};},{ toClassOnly: true})
    detalles: String;
    
    

    constructor(
        id: number,
        procedimiento: string,
        detalles: string,
    ) {
        this.id_procedimiento_mascota = id;
        this.name_procedimiento = procedimiento;
        this.detalles = detalles;
    }
}