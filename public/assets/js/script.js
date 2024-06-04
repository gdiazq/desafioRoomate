let roommates = [];
let gastos = [];
let gastoEditing = null;
const getRoommates = async () => {
  const res = await fetch("http://localhost:3000/apiV1/roommates");
  const data = await res.json();
  roommates = data.roommates;
};
const getGastos = async () => {
  const res = await fetch("http://localhost:3000/apiV1/gastos");
  const data = await res.json();
  gastos = data.gastos;
};

const imprimir = async () => {
  try {
    await getRoommates();
    await getGastos();
    $("#roommates").html("");
    $("#roommatesSelect").html("");
    $("#roommatesSelectModal").html("");
    roommates.forEach((r) => {
      $("#roommatesSelect").append(`
          <option value="${r.nombre}">${r.nombre}</option>
          `);
      $("#roommatesSelectModal").append(`
          <option value="${r.nombre}">${r.nombre}</option>
          `);
      $("#roommates").append(`
                  <tr>
                    <td>${r.nombre}</td>
                    <td class="text-danger">${r.debe ? r.debe : "-"}</td>
                    <td class="text-success">${r.recibe ? r.recibe : "-"}</td>
                  </tr>
              `);
    });
    $("#gastosHistorial").html("");
    gastos.forEach((g) => {
      $("#gastosHistorial").append(`
                <tr>
                  <td>${g.roommate}</td>
                  <td>${g.descripcion}</td>
                  <td>${g.monto}</td>
                  <td class="d-flex align-items-center justify-content-between">
                    <i class="fas fa-edit text-warning" onclick="editGasto('${g.id}')" data-toggle="modal" data-target="#exampleModal"></i>
                    <i class="fas fa-trash-alt text-danger" onclick="deleteGasto('${g.id}')" ></i>
                  </td>
                </tr>
              `);
    });
  } catch (e) {
    console.log(e);
  }
};

const nuevoRoommate = () => {
  fetch("http://localhost:3000/apiV1/roommates", { method: "POST" })
    .then((res) => res.json())
    .then(() => {
      imprimir();
    });
};

const agregarGasto = async () => {
  const roommateSelected = $("#roommatesSelect").val();
  const descripcion = $("#descripcion").val();
  const monto = Number($("#monto").val());
  const descripcionRegex = /^[A-Za-zñÑáíéóúÁÍÉÓÚäÄëËïÏöÖüÜ\d\s]+$/;
  if (roommateSelected === null) {
    alert("Debes ingresar un Roommate!");
    return;
  }
  if (!descripcionRegex.test(descripcion)) {
    alert("La descripción no puede contener carácteres especiales.");
    return;
  }
  if (descripcion.length > 50) {
    alert("La descripción no puede contener más de 50 carácteres.");
    return;
  }
  if (descripcion.length < 5) {
    alert("La descripción no puede contener menos de 5 carácteres.");
    return;
  }
  if (monto > 100000) {
    alert("No puedes ingresar un monto superior a $100.000");
    return;
  }
  if (monto < 1000) {
    alert("No puedes ingresar un monto inferior a $1.000");
    return;
  }
  await fetch("http://localhost:3000/apiV1/gastos", {
    method: "POST",
    body: JSON.stringify({
      roommate: roommateSelected,
      descripcion,
      monto,
    }),
    headers: { "Content-Type": "application/json" },
  });
  imprimir();
};

const deleteGasto = async (id) => {
  await fetch("http://localhost:3000/apiV1/gastos/?id=" + id, {
    method: "DELETE",
  });
  imprimir();
};

const updateGasto = async () => {
  const roommateSelected = $("#roommatesSelectModal").val();
  const descripcion = $("#descripcionModal").val();
  const monto = Number($("#montoModal").val());
  const descripcionRegex = /^[A-Za-zñÑáíéóúÁÍÉÓÚäÄëËïÏöÖüÜ\d\s]+$/;
  if (roommateSelected === null) {
    alert("Debes ingresar un Roommate!");
    return;
  }
  if (!descripcionRegex.test(descripcion)) {
    alert("La descripción no puede contener carácteres especiales.");
    return;
  }
  if (descripcion.length > 50) {
    alert("La descripción no puede contener más de 50 carácteres.");
    return;
  }
  if (descripcion.length < 5) {
    alert("La descripción no puede contener menos de 5 carácteres.");
    return;
  }
  if (monto > 100000) {
    alert("No puedes ingresar un monto superior a $100.000");
    return;
  }
  if (monto < 1000) {
    alert("No puedes ingresar un monto infeior a $1.000");
    return;
  }
  await fetch("http://localhost:3000/apiV1/gastos/?id=" + gastoEditing, {
    method: "PUT",
    body: JSON.stringify({
      roommate: roommateSelected,
      descripcion,
      monto,
    }),
    headers: { "Content-Type": "application/json" },
  });
  $("#exampleModal").modal("hide");
  imprimir();
};

const editGasto = (id) => {
  gastoEditing = id;
  const { roommate, descripcion, monto } = gastos.find((g) => g.id == id);
  $("#roommatesSelectModal").val(roommate);
  $("#descripcionModal").html(descripcion);
  $("#montoModal").val(monto);
};

imprimir();
