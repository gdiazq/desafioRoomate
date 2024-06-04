import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { ensureFileExistsRoommate } from "../utils/existFile.js";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const ROOMMATE_FILE = path.join(__dirname, "../data/roommates.json");
ensureFileExistsRoommate(ROOMMATE_FILE);

export const postRoommates = async () => {
  try {
    const response = await axios.get("https://randomuser.me/api");
    const responseRommate = response.data.results[0];
    const roommate = {
      id: uuidv4().slice(0, 6),
      nombre: `${responseRommate.name.first} ${responseRommate.name.last}`,
      debe: 0,
      recibe: 0,
    };
    const archivoRommate = fs.readFileSync(ROOMMATE_FILE, "utf8");
    const data = await JSON.parse(archivoRommate);
    const dataRoommate = data.roommates;
    dataRoommate.unshift(roommate);
    fs.writeFileSync(ROOMMATE_FILE, JSON.stringify(data));
    return data;
  } catch (error) {
    return {
      message: error.message,
      code: error.code,
      detail: error.detail,
      constraint: error.constraint,
      mensajeDelProgramador: "Creación de roommates fallida.",
    };
  }
};

export const getRoommates = async () => {
  try {
    const archivo = fs.readFileSync(ROOMMATE_FILE, "utf8");
    const data = JSON.parse(archivo);
    return data;
  } catch (error) {
    return {
      message: error.message,
      code: error.code,
      detail: error.detail,
      constraint: error.constraint,
      mensajeDelProgramador: "Obteción de roommates fallida.",
    };
  }
};