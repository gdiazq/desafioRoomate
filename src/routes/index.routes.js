import { Router } from "express";

const router = Router();

import rutasRoommates from "./roommates.routes.js"; 
import rutasGastos from "./gastos.routes.js";

//Ruta principal
router.get("/", (req, res) => {
  try {
    res.status(200).sendFile("index.html");
  } catch (error) {
    console.error("Hubo un error", error.message);
    res.status(500).send(error.message);
  }
});

//Rutas Roommates y Pagos
router.use("/roommates", rutasRoommates);
router.use("/gastos", rutasGastos);

//Ruta genérica
router.get("*", (req, res) => {
  try {
    res.status(404).send(`<h1>Sitio Web No Encontrado</h1>`);
  } catch (error) {
    console.error("Hubo un error", error.message);
    res.status(500).send(error.message);
  }
});

export default router;
