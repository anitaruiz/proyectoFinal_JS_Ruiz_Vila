let sessionData = JSON.parse(sessionStorage.getItem("userData")) || [];
const guardarSession = () => {
  sessionStorage.setItem("userData", JSON.stringify(sessionData));
};

const succesMsg = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Tus datos fueron cargados correctamente!",
    showConfirmButton: false,
    timer: 2000,
  });
};

const errMsg = () => {
  Swal.fire({
    position: "center",
    icon: "error",
    title: "debes completar todos tus datos!",
    showConfirmButton: false,
    timer: 2000,
  });
};

document.querySelector("#guardarDatos").addEventListener("click", () => {
  event.preventDefault();
  let nombre = document.querySelector("#nombre").value;
  let direccion = document.querySelector("#direccion").value;
  let telefono = document.querySelector("#telefono").value;
  let clave = document.querySelector("#clave").value;
  let comentario = document.querySelector("#comentario").value;

  sessionData.push({
    nombre: nombre,
    direccion: direccion,
    telefono: telefono,
    clave: clave,
    comentario: comentario,
  });

  sessionData.forEach((e) => {
    if (
      e.nombre == `` ||
      e.direccion == `` ||
      e.telefono == `` ||
      e.clave == ``
    ) {
      errMsg();
      sessionStorage.clear();
      sessionData.shift(0);
    } else {
      guardarSession();
      succesMsg();
      resumenCompra();
    }
  });
});

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const verResumen = document.querySelector("#resumen");

const resumenCompra = () => {
  verResumen.innerHTML = "";

  let resumenT = () => {
    const titulo = document.createElement("div");
    titulo.className = "text-center bg-white";
    titulo.innerHTML = `<h3>Resumen</h3>`;

    verResumen.append(titulo);
  };
  resumenT();

  carrito.forEach((e) => {
    const resumen = document.createElement("p");
    resumen.className = "text-black my-3";
    resumen.innerHTML = `
    <div>${e.nombre}</div>
    <div>Cantidad: ${e.cantidad}</div>
    <div>Precio: $${e.precio * e.cantidad}</div>
    <hr>
    `;

    verResumen.append(resumen);
  });

  const finalizarBtn = document.createElement("button");
  finalizarBtn.innerText = "Confirmar";
  finalizarBtn.className = "btn btn-dark my-3";

  verResumen.append(finalizarBtn);

  finalizarBtn.addEventListener("click", () => {
    sessionData.forEach((e) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Muchas gracias ${e.nombre}!</p>
        <p>tu pedido con destino: ${e.direccion} esta siendo preparado.</p>
        <p>nos pondremos en contacto a la brevedad</p>`,
        showConfirmButton: false,
        timer: 5000,
      });
    });
  });
};
