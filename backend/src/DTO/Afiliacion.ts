import {Expose,Type,Transform} from "class-transformer";
import {IsInt, IsDefined, MinLength ,MaxLength} from "class-validator";
import "reflect-metadata";

export class Afiliacion{
    @IsInt()
    @Expose({ name: 'id_afiliacion' })
    @Transform(({value})=>{
        if(/^[0-9]+$/.test(value) || typeof value == "undefined") 
        return (value); else throw {status:400, message: "el dato del id ingresado es incorrecto, ingresa un número entero"}}, {toClassOnly: true})
    id_afiliacion: number;
    @IsDefined()
    @MinLength(3, {message: ()=>{throw {status: 401, message: `Haz ingresado muy pocos caracteres`}}})
    @MaxLength(15, {message: ()=>{throw {status: 401, message: `El plan de usuario no puede superar los 15 caracteres`}}}) 
    @Expose({name: "plan_usuario"})
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ]+$/.test(value)) return value; else throw {status: 400, message:`El dato del plan usuario incumple los parametros acordados`};},{ toClassOnly: true})
    plan_usuario: String;
    

    constructor(
        id: number,
        plan: string,
    ) {
        this.id_afiliacion = id;
        this.plan_usuario = plan;
    }
}