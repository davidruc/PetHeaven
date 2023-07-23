import {Expose,Type,Transform} from "class-transformer";
import {IsInt, IsDefined, MinLength ,MaxLength} from "class-validator";
import "reflect-metadata";

export class Raza{
    @IsInt()
    @Expose({ name: 'id_raza' })
    @Transform(({value})=>{
        if(/^[0-9]+$/.test(value) || typeof value == "undefined") 
        return (value); else throw {status:400, message: "el dato del id ingresado es incorrecto, ingresa un número entero"}}, {toClassOnly: true})
    id_raza: number;
    @IsDefined()
    @MinLength(3, {message: ()=>{throw {status: 401, message: `El nombre de la raza con menos caracteres tiene 3`}}})
    @MaxLength(25, {message: ()=>{throw {status: 401, message: `El nombre de la raza no puede superar los 25 caracteres`}}}) 
    @Expose({name: "nombre_raza"})
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ]+$/.test(value)) return value; else throw {status: 400, message:`El dato nombre incumple los parametros acordados`};},{ toClassOnly: true})
    nombre_raza: String;
    @IsInt()
    @Expose({ name: 'fk_especie' })
    @Transform(({value})=>{
        if(/^[0-9]+$/.test(value) || typeof value == "undefined") 
        return (value); else throw {status:400, message: "el dato del id ingresado es incorrecto, ingresa un número entero"}}, {toClassOnly: true})
    fk_especie: number;
    

    constructor(
        id: number,
        raza: string,
        especie_id: number
    ) {
        this.id_raza = id;
        this.nombre_raza = raza;
        this.fk_especie = especie_id;
    }
}