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
export class EstadoPlan {
    constructor(id, estado_plan) {
        this.id_estado = id;
        this.estado = estado_plan;
    }
}
__decorate([
    IsInt(),
    Expose({ name: 'id_estado' }),
    Transform(({ value }) => {
        if (/^[0-9]+$/.test(value) || typeof value == "undefined")
            return (value);
        else
            throw { status: 400, message: "el dato del id ingresado es incorrecto, ingresa un número entero" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], EstadoPlan.prototype, "id_estado", void 0);
__decorate([
    IsDefined(),
    MinLength(3, { message: () => { throw { status: 401, message: `Haz ingresado muy pocos caracteres` }; } }),
    MaxLength(15, { message: () => { throw { status: 401, message: `El estado del plan no puede superar los 15 caracteres` }; } }),
    Expose({ name: "estado" }),
    Transform(({ value }) => { if (/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `El dato del estado del plan incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], EstadoPlan.prototype, "estado", void 0);
