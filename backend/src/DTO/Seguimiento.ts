import {Expose,Type,Transform} from "class-transformer";
import {IsInt, IsDefined, MinLength ,MaxLength, Length} from "class-validator";
import "reflect-metadata";

export class Seguimiento{
    @IsInt()
    @Expose({ name: 'id_seguimiento_mascota' })
    @Transform(({value})=>{
        if(/^[0-9]+$/.test(value) || typeof value == "undefined") 
        return (value); else throw {status:400, message: "el dato del id ingresado es incorrecto, ingresa un número entero"}}, {toClassOnly: true})
    id_seguimiento_mascota: number;
    @Expose({name: "fecha_inicio"})
    @Transform(({value})=> {if(/^\d{4}-\d{2}-\d{2}$/.test(value) || typeof value == "undefined") return(value); else throw {status: 400, message:`el parámetro ingresado para fecha no es válido, debe seguir la sintaxis AAAA-MM-DD`};}, {toClassOnly:true})
    fecha_inicio: string;
    @Expose({name: "fecha_final_apreciada"})
    @Transform(({value})=> {if(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value) || typeof value == "undefined") return(value); else throw {status: 400, message:`el parámetro ingresado para fecha no es válido, debe seguir la sintaxis AAAA-MM-DDTHH:mm`};}, {toClassOnly:true})
    fecha_final_apreciada: string;
    @IsInt()
    @Expose({ name: 'fk_procedimiento' })
    @Transform(({value})=>{
        if(/^[0-9]+$/.test(value) || typeof value == "undefined") 
        return (value); else throw {status:400, message: "el dato del id ingresado es incorrecto, ingresa un número entero"}}, {toClassOnly: true})
    fk_procedimiento: number;
    @IsInt()
    @Expose({ name: 'fk_mascota' })
    @Transform(({value})=>{
        if(/^[0-9]+$/.test(value) || typeof value == "undefined") 
        return (value); else throw {status:400, message: "el dato del id ingresado es incorrecto, ingresa un número entero"}}, {toClassOnly: true})
    fk_mascota: number;
    
    

    constructor(
        id: number,
        entrada: string,
        salida: string,
        procedimiento: number,
        mascota: number
        
    ) {
        this.id_seguimiento_mascota = id;
        this.fecha_inicio = entrada;
        this.fecha_final_apreciada = salida;
        this.fk_procedimiento = procedimiento;
        this.fk_mascota = mascota;
    }
}