import express from "express";
import rutas from "./routes/index.routes.js";

export const app = express();
export const PORT = 3000;

//Middlewares
app.use(express.static("public"));
app.use(express.json());

//Rutas
app.use("/apiV1", rutas);
