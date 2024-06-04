import { Router } from "express"; 

const router = Router();

import { calcularDeuda } from "../controllers/calculo.controller.js";
import { getRoommates, postRoommates } from "../controllers/roommates.controller.js";

router.post("/", async (req, res) => {
  try {
    const response = await postRoommates();
    calcularDeuda();
    res.status(200).json(response);
  } catch (error) {
    console.error("Hubo un error", error.message);
    res.status(500).send(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const response = await getRoommates();
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    console.error("Hubo un error", error.message);
    res.status(500).send(error.message);
  }
});

export default router;
