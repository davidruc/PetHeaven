import {Expose,Type,Transform} from "class-transformer";
import {IsInt, IsDefined, MinLength ,MaxLength} from "class-validator";
import "reflect-metadata";

export class Especie{
    @IsInt()
    @Expose({ name: 'id_especie' })
    @Transform(({value})=>{
        if(/^[0-9]+$/.test(value) || typeof value == "undefined") 
        return (value); else throw {status:400, message: "el dato del id ingresado es incorrecto, ingresa un número entero"}}, {toClassOnly: true})
    id_especie: number;
    @IsDefined()
    @MinLength(3, {message: ()=>{throw {status: 401, message: `El nombre de la especie con menos caracteres es ave y tiene 3`}}})
    @MaxLength(25, {message: ()=>{throw {status: 401, message: `El nombre de la especie no puede superar los 25 caracteres`}}}) 
    @Expose({name: "nombre_especie"})
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ]+$/.test(value)) return value; else throw {status: 400, message:`El dato nombre incumple los parametros acordados`};},{ toClassOnly: true})
    nombre_especie: String;
    

    constructor(
        id: number,
        especie: string,
    ) {
        this.id_especie = id;
        this.nombre_especie = especie;
    }
}