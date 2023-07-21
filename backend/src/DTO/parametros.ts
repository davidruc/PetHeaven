import {Expose,Type,Transform} from "class-transformer";
import {IsInt} from "class-validator";
import "reflect-metadata";

export class parametros{
    @IsInt()
    @Expose({ name: 'id' })
    @Transform(({value})=>{
        if(/^[0-9]+$/.test(value)) 
        return (value); else throw {status:400, message: "el dato del id ingresado es incorrecto, ingresa un número entero"}}, {toClassOnly: true})
    id: number;

    constructor(
        idEntrada : number
    ) {
        this.id = idEntrada;
    }
}