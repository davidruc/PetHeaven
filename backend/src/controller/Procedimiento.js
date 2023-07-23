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
import { IsInt, IsDefined, MinLength, MaxLength } from "class-validator";
import "reflect-metadata";
export class Procedimiento {
    constructor(id, procedimiento, detalles) {
        this.id_procedimiento_mascota = id;
        this.name_procedimiento = procedimiento;
        this.detalles = detalles;
    }
}
__decorate([
    IsInt(),
    Expose({ name: 'id_procedimiento_mascota' }),
    Transform(({ value }) => {
        if (/^[0-9]+$/.test(value) || typeof value == "undefined")
            return (value);
        else
            throw { status: 400, message: "el dato del id ingresado es incorrecto, ingresa un número entero" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Procedimiento.prototype, "id_procedimiento_mascota", void 0);
__decorate([
    IsDefined(),
    MinLength(1, { message: () => { throw { status: 401, message: `El nombre del procedimiento debe contener almenos un caracter` }; } }),
    MaxLength(50, { message: () => { throw { status: 401, message: `El nombre del procedimiento no puede superar los 50 caracteres` }; } }),
    Expose({ name: "name_procedimiento" }),
    Transform(({ value }) => { if (/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `El dato nombre del procedimiento incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], Procedimiento.prototype, "name_procedimiento", void 0);
__decorate([
    MinLength(1, { message: () => { throw { status: 401, message: `los detalles del procedimiento debe contener almenos un caracter` }; } }),
    MaxLength(255, { message: () => { throw { status: 401, message: `los detalles del procedimiento no puede superar los 255 caracteres` }; } }),
    Expose({ name: "detalles" }),
    Transform(({ value }) => { if (/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `El campo detalles incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], Procedimiento.prototype, "detalles", void 0);
