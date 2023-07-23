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
import { IsInt, Length } from "class-validator";
import "reflect-metadata";
export class Plan {
    constructor(id, fecha, estado_plan, tipo_afiliacion, usuario) {
        this.id_plan = id;
        this.fecha_afiliacion = fecha;
        this.fk_estado_plan = estado_plan;
        this.fk_tipo_afiliacion = tipo_afiliacion;
        this.fk_usuario = usuario;
    }
}
__decorate([
    IsInt(),
    Expose({ name: 'id_plan' }),
    Transform(({ value }) => {
        if (/^[0-9]+$/.test(value) || typeof value == "undefined")
            return (value);
        else
            throw { status: 400, message: "el dato del id ingresado es incorrecto, ingresa un número entero" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Plan.prototype, "id_plan", void 0);
__decorate([
    Expose({ name: "fecha_afiliacion" }),
    Transform(({ value }) => { if (/^\d{4}-\d{2}-\d{2}$/.test(value) || typeof value == "undefined")
        return (value);
    else
        throw { status: 400, message: `el parámetro ingresado para fecha no es válido, debe seguir la sintaxis AAAA-MM-DD` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], Plan.prototype, "fecha_afiliacion", void 0);
__decorate([
    IsInt(),
    Expose({ name: 'fk_estado_plan' }),
    Transform(({ value }) => {
        if (/^[0-9]+$/.test(value) || typeof value == "undefined")
            return (value);
        else
            throw { status: 400, message: "el dato del id ingresado es incorrecto, ingresa un número entero" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Plan.prototype, "fk_estado_plan", void 0);
__decorate([
    IsInt(),
    Expose({ name: 'fk_tipo_afiliacion' }),
    Length(10, 20),
    Transform(({ value }) => {
        if (/^[0-9]+$/.test(value) || typeof value == "undefined")
            return (value);
        else
            throw { status: 400, message: "el dato del id ingresado es incorrecto, ingresa un número entero" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Plan.prototype, "fk_tipo_afiliacion", void 0);
__decorate([
    IsInt(),
    Expose({ name: 'fk_usuario' }),
    Length(10, 20),
    Transform(({ value }) => {
        if (/^[0-9]+$/.test(value) || typeof value == "undefined")
            return (value);
        else
            throw { status: 400, message: "el dato del id ingresado es incorrecto, ingresa un número entero" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Plan.prototype, "fk_usuario", void 0);
