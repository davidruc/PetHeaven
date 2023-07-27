import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';   

/* Middleware de validacion del token de acceso a la api */
import { generateToken, validateToken } from "./middleware/jwt.js";
/* Routes para CRUD */
import routerEspecie from "./routes/especie.js";
import routerRaza from "./routes/raza.js";
import routerAfiliacion from "./routes/tipo_afiliacion.js";
import routerEstadoPlan from "./routes/estado_plan.js";
import routerUsuario from "./routes/usuario.js";
import routerPlan from "./routes/plan.js";
import routerMascota from "./routes/mascota.js";
import routerProcedimiento from "./routes/procedimiento.js";
import routerSeguimiento from "./routes/seguimiento.js";
/* Routes Específicas */
import routerUsuMascotas from "./routes/UsuMas.js";
import routerInfoPlan from "./routes/InfoPlan.js";
import routerUsuarioMora from "./routes/UsuMora.js";
import routerSegMascota from "./routes/seguimientoMascota.js";


dotenv.config();
const appExpress = express();

appExpress.use(express.json());
appExpress.use(cookieParser());

/* Autorizacion del tokien */
appExpress.get("/token", generateToken, (req,res)=>{
    res.send({token: req.token})
})
/* EndPoints CRUD */
appExpress.use("/api/especie", validateToken ,routerEspecie);
appExpress.use("/api/raza", validateToken ,routerRaza);
appExpress.use("/api/afiliacion", validateToken ,routerAfiliacion);
appExpress.use("/api/estadoPlan", validateToken ,routerEstadoPlan);
appExpress.use("/api/usuario", validateToken ,routerUsuario);
appExpress.use("/api/plan", validateToken ,routerPlan);
appExpress.use("/api/mascota", validateToken ,routerMascota);
appExpress.use("/api/procedimiento", validateToken ,routerProcedimiento);
appExpress.use("/api/seguimiento", validateToken ,routerSeguimiento);
/* EndPoints específicos */
appExpress.use("/api/UsuarioMascotas", validateToken ,routerUsuMascotas);
appExpress.use("/api/infoPlan", validateToken ,routerInfoPlan);
appExpress.use("/api/usuariosMora", validateToken ,routerUsuarioMora);
appExpress.use("/api/seguimientoMascotas", validateToken ,routerSegMascota);

const config = JSON.parse(process.env.MY_CONFIG);
appExpress.listen(config, ()=>console.log(`http://${config.hostname}:${config.port}`))

export default appExpress;
