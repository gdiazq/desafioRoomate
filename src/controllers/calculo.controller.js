import fs from "fs";

export const calcularDeuda = () => {
  try {
    const roommatesData = fs.readFileSync("./data/roommates.json", "utf8");
    const gastosData = fs.readFileSync("./data/gastos.json", "utf8");

    const { roommates } = JSON.parse(roommatesData);
    const { gastos } = JSON.parse(gastosData);

    roommates.forEach((roommate) => {
      roommate.debe = 0;
      roommate.recibe = 0;
      roommate.total = 0;
    });
    gastos.forEach((gasto) => {
      const montoPorPersona = gasto.monto / roommates.length;
      roommates.forEach((roommate) => {
        if (gasto.roommate === roommate.nombre) {
          roommate.recibe += montoPorPersona * (roommates.length - 1);
        } else {
          roommate.debe -= montoPorPersona;
        }
        roommate.total = roommate.recibe - roommate.debe;
      });
    });
    fs.writeFileSync("./data/roommates.json", JSON.stringify({ roommates }));
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
