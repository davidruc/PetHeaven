import {Expose,Type,Transform} from "class-transformer";
import {IsInt, IsDefined, MinLength ,MaxLength, Length} from "class-validator";
import "reflect-metadata";

export class Usuario{
    @IsInt()
    @Expose({ name: 'id_usuario' })
    @Transform(({value})=>{
        if(/^[0-9]+$/.test(value) || typeof value == "undefined") 
        return (value); else throw {status:400, message: "el dato del id ingresado es incorrecto, ingresa un número entero"}}, {toClassOnly: true})
    id_usuario: number;
    @IsDefined()
    @MinLength(3, {message: ()=>{throw {status: 401, message: `El nombre de la usuario con menos caracteres tiene 3`}}})
    @MaxLength(25, {message: ()=>{throw {status: 401, message: `El nombre de la usuario no puede superar los 25 caracteres`}}}) 
    @Expose({name: "nombre_usuario"})
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ]+$/.test(value)) return value; else throw {status: 400, message:`El dato nombre incumple los parametros acordados`};},{ toClassOnly: true})
    nombre_usuario: String;
    @IsInt()
    @Expose({ name: 'telefono_contacto' })
    @Transform(({value})=>{
        if(/^[0-9]+$/.test(value) || typeof value == "undefined") 
        return (value); else throw {status:400, message: "el dato del id ingresado es incorrecto, ingresa un número entero"}}, {toClassOnly: true})
    telefono_contacto: number;
    @IsInt()
    @Expose({ name: 'documento' })
    @Length(10, 20)
    @Transform(({value})=>{
        if(/^[0-9]+$/.test(value) || typeof value == "undefined") 
        return (value); else throw {status:400, message: "el dato del id ingresado es incorrecto, ingresa un número entero"}}, {toClassOnly: true})
    documento: number;
    

    constructor(
        id: number,
        usuario: string,
        telefono: number,
        documento: number
    ) {
        this.id_usuario = id;
        this.nombre_usuario = usuario;
        this.telefono_contacto = telefono;
        this.documento = documento;
    }
}