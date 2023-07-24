import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';   
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


dotenv.config();
const appExpress = express();

appExpress.use(express.json());
appExpress.use(cookieParser());
/* EndPoints CRUD */
appExpress.use("/especie", routerEspecie);
appExpress.use("/raza", routerRaza);
appExpress.use("/afiliacion", routerAfiliacion);
appExpress.use("/estadoPlan", routerEstadoPlan);
appExpress.use("/usuario", routerUsuario);
appExpress.use("/plan", routerPlan);
appExpress.use("/mascota", routerMascota);
appExpress.use("/procedimiento", routerProcedimiento);
appExpress.use("/seguimiento", routerSeguimiento);
/* EndPoints específicos */
appExpress.use("/UsuarioMascotas", routerUsuMascotas);


const config = JSON.parse(process.env.MY_CONFIG);
appExpress.listen(config, ()=>console.log(`http://${config.hostname}:${config.port}`))

export default appExpress;
