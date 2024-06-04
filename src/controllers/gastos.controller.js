import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { ensureFileExistsGastos } from "../utils/existFile.js";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const GASTOS_FILE = path.join(__dirname, "../data/gastos.json");
ensureFileExistsGastos(GASTOS_FILE);

export const getGastos = async () => {
  try {
    const archivo = fs.readFileSync(GASTOS_FILE, "utf8");
    const data = JSON.parse(archivo);
    return data;
  } catch (error) {
    return {
      message: error.message,
      code: error.code,
      detail: error.detail,
      constraint: error.constraint,
      mensajeDelProgramador: "Obtención de gastos fallida.",
    };
  }
};

export const postGastos = async (roommate, descripcion, monto) => {
  try {
    const gasto = {
      id: uuidv4().slice(0, 6),
      roommate,
      descripcion,
      monto,
    };
    const archivo = fs.readFileSync(GASTOS_FILE, "utf8");
    const data = await JSON.parse(archivo);
    const gastoData = data.gastos;
    gastoData.unshift(gasto);
    fs.writeFileSync(GASTOS_FILE, JSON.stringify(data));
    return data;
  } catch (error) {
    return {
      message: error.message,
      code: error.code,
      detail: error.detail,
      constraint: error.constraint,
      mensajeDelProgramador: "Creación de gastos fallida.",
    };
  }
};

export const putGastos = async (id, roommate, descripcion, monto) => {
  try {
    const archivo = fs.readFileSync(GASTOS_FILE, "utf-8");
    const data = JSON.parse(archivo);
    let { gastos } = data;

    gastos = gastos.map((gasto) => {
      if (gasto.id === id) {
        (gasto.roommate = roommate),
          (gasto.descripcion = descripcion),
          (gasto.monto = monto);
        return gasto;
      }
      return gasto;
    });
    fs.writeFileSync(GASTOS_FILE, JSON.stringify({ gastos }));
    return gastos;
  } catch (error) {
    return {
      message: error.message,
      code: error.code,
      detail: error.detail,
      constraint: error.constraint,
      mensajeDelProgramador: "Edición de gasto fallida.",
    };
  }
};

export const deleteGastos = async (id) => {
  try {
    const archivo = fs.readFileSync(GASTOS_FILE, "utf-8");
    const data = JSON.parse(archivo);
    let { gastos } = data;
    const gastosFindIndex = gastos.findIndex((gasto) => gasto.id === id);
    if (gastosFindIndex !== -1) {
      gastos.splice(gastosFindIndex, 1);
      fs.writeFileSync(GASTOS_FILE, JSON.stringify(data));
    }
    return data;
  } catch (error) {
    return {
      message: error.message,
      code: error.code,
      detail: error.detail,
      constraint: error.constraint,
      mensajeDelProgramador: "Eliminación de gasto fallida.",
    };
  }
};
