import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';   

import routerEspecie from "./routes/especie.js";
import routerRaza from "./routes/raza.js";
import routerAfiliacion from "./routes/tipo_afiliacion.js";
import routerEstadoPlan from "./routes/estado_plan.js";

dotenv.config();
const appExpress = express();

appExpress.use(express.json());
appExpress.use(cookieParser());

appExpress.use("/especie", routerEspecie);
appExpress.use("/raza", routerRaza);
appExpress.use("/afiliacion", routerAfiliacion);
appExpress.use("/estadoPlan", routerEstadoPlan);

const config = JSON.parse(process.env.MY_CONFIG);
appExpress.listen(config, ()=>console.log(`http://${config.hostname}:${config.port}`))

export default appExpress;
