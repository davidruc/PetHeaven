import {Expose,Type,Transform} from "class-transformer";
import {IsInt, IsDefined, MinLength ,MaxLength} from "class-validator";
import "reflect-metadata";

export class EstadoPlan{
    @IsInt()
    @Expose({ name: 'id_estado' })
    @Transform(({value})=>{
        if(/^[0-9]+$/.test(value) || typeof value == "undefined") 
        return (value); else throw {status:400, message: "el dato del id ingresado es incorrecto, ingresa un número entero"}}, {toClassOnly: true})
    id_estado: number;
    @IsDefined()
    @MinLength(3, {message: ()=>{throw {status: 401, message: `Haz ingresado muy pocos caracteres`}}})
    @MaxLength(15, {message: ()=>{throw {status: 401, message: `El estado del plan no puede superar los 15 caracteres`}}}) 
    @Expose({name: "estado"})
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ]+$/.test(value)) return value; else throw {status: 400, message:`El dato del estado del plan incumple los parametros acordados`};},{ toClassOnly: true})
    estado: String;
    

    constructor(
        id: number,
        estado_plan: string,
    ) {
        this.id_estado = id;
        this.estado = estado_plan;
    }
}