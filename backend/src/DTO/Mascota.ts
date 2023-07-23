import {Expose,Type,Transform} from "class-transformer";
import {IsInt, IsDefined, MinLength ,MaxLength, Length} from "class-validator";
import "reflect-metadata";

export class Mascota{
    @IsInt()
    @Expose({ name: 'id_mascota' })
    @Transform(({value})=>{
        if(/^[0-9]+$/.test(value) || typeof value == "undefined") 
        return (value); else throw {status:400, message: "el dato del id ingresado es incorrecto, ingresa un número entero"}}, {toClassOnly: true})
    id_mascota: number;
    @IsDefined()
    @MinLength(1, {message: ()=>{throw {status: 401, message: `El nombre de la mascota debe contener almenos un caracter`}}})
    @MaxLength(50, {message: ()=>{throw {status: 401, message: `El nombre de la mascota no puede superar los 50 caracteres`}}}) 
    @Expose({name: "nombre_mascota"})
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ]+$/.test(value)) return value; else throw {status: 400, message:`El dato nombre de la mascota incumple los parametros acordados`};},{ toClassOnly: true})
    nombre_mascota: String;
    @IsInt()
    @Expose({ name: 'edad_mascota' })
    @Transform(({value})=>{
        if(/^[0-9]+$/.test(value) || typeof value == "undefined") 
        return (value); else throw {status:400, message: "el dato de la edad ingresado es incorrecto, ingresa un número entero"}}, {toClassOnly: true})
    edad_mascota: number;
    @IsInt()
    @Expose({ name: 'fk_dueño' })
    @Length(10, 20)
    @Transform(({value})=>{
        if(/^[0-9]+$/.test(value) || typeof value == "undefined") 
        return (value); else throw {status:400, message: "el dato del id del dueño ingresado es incorrecto, ingresa un número entero"}}, {toClassOnly: true})
    fk_dueño: number;
    @IsInt()
    @Expose({ name: 'fk_raza' })
    @Length(10, 20)
    @Transform(({value})=>{
        if(/^[0-9]+$/.test(value) || typeof value == "undefined") 
        return (value); else throw {status:400, message: "el dato del id de la raza ingresado es incorrecto, ingresa un número entero"}}, {toClassOnly: true})
    fk_raza: number;
    

    constructor(
        id: number,
        nombre: string,
        edad: number,
        dueño: number,
        raza: number
    ) {
        this.id_mascota = id;
        this.nombre_mascota = nombre
        this.edad_mascota = edad;
        this.fk_dueño = dueño;
        this.fk_raza = raza;
    }
}