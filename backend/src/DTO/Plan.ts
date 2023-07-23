import {Expose,Type,Transform} from "class-transformer";
import {IsInt, IsDefined, MinLength ,MaxLength, Length} from "class-validator";
import "reflect-metadata";

export class Plan{
    @IsInt()
    @Expose({ name: 'id_plan' })
    @Transform(({value})=>{
        if(/^[0-9]+$/.test(value) || typeof value == "undefined") 
        return (value); else throw {status:400, message: "el dato del id ingresado es incorrecto, ingresa un número entero"}}, {toClassOnly: true})
    id_plan: number;
    @Expose({name: "fecha_afiliacion"})
    @Transform(({value})=> {if(/^\d{4}-\d{2}-\d{2}$/.test(value) || typeof value == "undefined") return(value); else throw {status: 400, message:`el parámetro ingresado para fecha no es válido, debe seguir la sintaxis AAAA-MM-DD`};}, {toClassOnly:true})
    fecha_afiliacion: string;
    @IsInt()
    @Expose({ name: 'fk_estado_plan' })
    @Transform(({value})=>{
        if(/^[0-9]+$/.test(value) || typeof value == "undefined") 
        return (value); else throw {status:400, message: "el dato del id ingresado es incorrecto, ingresa un número entero"}}, {toClassOnly: true})
    fk_estado_plan: number;
    @IsInt()
    @Expose({ name: 'fk_tipo_afiliacion' })
    @Length(10, 20)
    @Transform(({value})=>{
        if(/^[0-9]+$/.test(value) || typeof value == "undefined") 
        return (value); else throw {status:400, message: "el dato del id ingresado es incorrecto, ingresa un número entero"}}, {toClassOnly: true})
    fk_tipo_afiliacion: number;
    @IsInt()
    @Expose({ name: 'fk_usuario' })
    @Length(10, 20)
    @Transform(({value})=>{
        if(/^[0-9]+$/.test(value) || typeof value == "undefined") 
        return (value); else throw {status:400, message: "el dato del id ingresado es incorrecto, ingresa un número entero"}}, {toClassOnly: true})
    fk_usuario: number;
    

    constructor(
        id: number,
        fecha: string,
        estado_plan: number,
        tipo_afiliacion: number,
        usuario: number
    ) {
        this.id_plan = id;
        this.fecha_afiliacion = fecha;
        this.fk_estado_plan = estado_plan;
        this.fk_tipo_afiliacion = tipo_afiliacion;
        this.fk_usuario = usuario;
    }
}