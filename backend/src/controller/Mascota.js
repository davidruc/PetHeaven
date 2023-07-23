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
import { IsInt, IsDefined, MinLength, MaxLength, Length } from "class-validator";
import "reflect-metadata";
export class Mascota {
    constructor(id, nombre, edad, dueño, raza) {
        this.id_mascota = id;
        this.nombre_mascota = nombre;
        this.edad_mascota = edad;
        this.fk_dueño = dueño;
        this.fk_raza = raza;
    }
}
__decorate([
    IsInt(),
    Expose({ name: 'id_mascota' }),
    Transform(({ value }) => {
        if (/^[0-9]+$/.test(value) || typeof value == "undefined")
            return (value);
        else
            throw { status: 400, message: "el dato del id ingresado es incorrecto, ingresa un número entero" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Mascota.prototype, "id_mascota", void 0);
__decorate([
    IsDefined(),
    MinLength(1, { message: () => { throw { status: 401, message: `El nombre de la mascota debe contener almenos un caracter` }; } }),
    MaxLength(50, { message: () => { throw { status: 401, message: `El nombre de la mascota no puede superar los 50 caracteres` }; } }),
    Expose({ name: "nombre_mascota" }),
    Transform(({ value }) => { if (/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `El dato nombre de la mascota incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], Mascota.prototype, "nombre_mascota", void 0);
__decorate([
    IsInt(),
    Expose({ name: 'edad_mascota' }),
    Transform(({ value }) => {
        if (/^[0-9]+$/.test(value) || typeof value == "undefined")
            return (value);
        else
            throw { status: 400, message: "el dato de la edad ingresado es incorrecto, ingresa un número entero" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Mascota.prototype, "edad_mascota", void 0);
__decorate([
    IsInt(),
    Expose({ name: 'fk_dueño' }),
    Length(10, 20),
    Transform(({ value }) => {
        if (/^[0-9]+$/.test(value) || typeof value == "undefined")
            return (value);
        else
            throw { status: 400, message: "el dato del id del dueño ingresado es incorrecto, ingresa un número entero" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Mascota.prototype, "fk_due\u00F1o", void 0);
__decorate([
    IsInt(),
    Expose({ name: 'fk_raza' }),
    Length(10, 20),
    Transform(({ value }) => {
        if (/^[0-9]+$/.test(value) || typeof value == "undefined")
            return (value);
        else
            throw { status: 400, message: "el dato del id de la raza ingresado es incorrecto, ingresa un número entero" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Mascota.prototype, "fk_raza", void 0);
