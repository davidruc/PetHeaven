var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Transform } from "class-transformer";
import { IsInt } from "class-validator";
import "reflect-metadata";
export class Seguimiento {
    constructor(id, entrada, salida, procedimiento, mascota) {
        this.id_seguimiento_mascota = id;
        this.fecha_inicio = entrada;
        this.fecha_final_apreciada = salida;
        this.fk_procedimiento = procedimiento;
        this.fk_mascota = mascota;
    }
}
__decorate([
    IsInt(),
    Expose({ name: 'id_seguimiento_mascota' }),
    Transform(({ value }) => {
        if (/^[0-9]+$/.test(value) || typeof value == "undefined")
            return (value);
        else
            throw { status: 400, message: "el dato del id ingresado es incorrecto, ingresa un número entero" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Seguimiento.prototype, "id_seguimiento_mascota", void 0);
__decorate([
    Expose({ name: "fecha_inicio" }),
    Transform(({ value }) => { if (/^\d{4}-\d{2}-\d{2}$/.test(value) || typeof value == "undefined")
        return (value);
    else
        throw { status: 400, message: `el parámetro ingresado para fecha no es válido, debe seguir la sintaxis AAAA-MM-DD` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], Seguimiento.prototype, "fecha_inicio", void 0);
__decorate([
    Expose({ name: "fecha_final_apreciada" }),
    Transform(({ value }) => { if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value) || typeof value == "undefined")
        return (value);
    else
        throw { status: 400, message: `el parámetro ingresado para fecha no es válido, debe seguir la sintaxis AAAA-MM-DDTHH:mm` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], Seguimiento.prototype, "fecha_final_apreciada", void 0);
__decorate([
    IsInt(),
    Expose({ name: 'fk_procedimiento' }),
    Transform(({ value }) => {
        if (/^[0-9]+$/.test(value) || typeof value == "undefined")
            return (value);
        else
            throw { status: 400, message: "el dato del id ingresado es incorrecto, ingresa un número entero" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Seguimiento.prototype, "fk_procedimiento", void 0);
__decorate([
    IsInt(),
    Expose({ name: 'fk_mascota' }),
    Transform(({ value }) => {
        if (/^[0-9]+$/.test(value) || typeof value == "undefined")
            return (value);
        else
            throw { status: 400, message: "el dato del id ingresado es incorrecto, ingresa un número entero" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Seguimiento.prototype, "fk_mascota", void 0);
