// mostrar seccion de productos "Snacks"

const verSnacks = document.querySelector("#snacks");

verSnacks.addEventListener("click", () => {
  mostrarSnacks();
});

const mostrarSnacks = async () => {
  listaProductos.innerHTML = "";
  const resp = await fetch("snacks.json");
  const data = await resp.json();

  data.forEach((e) => {
    const producto = document.createElement("p");
    producto.innerHTML = `
      <div class="mx-2">
      <img src="./img/hamburguesa.jpg" class="card-img-top" alt="card-grid-image">
      <div class="card-body">
      <h5 class="card-title">${e.nombre}</h5>
    <p class="card-text">$${e.precio}<p>
    </div>
    </div>`;

    listaProductos.append(producto);

    const addBtn = document.createElement("button");
    addBtn.innerText = "agregar";
    addBtn.className = "btn btn-dark m-2";

    producto.append(addBtn);

    addBtn.addEventListener("click", () => {
      const r = carrito.some((r) => r.id === e.id);
      if (r) {
        carrito.map((a) => {
          if (a.id === e.id) {
            a.cantidad++;
          }
        });
      } else {
        carrito.push({
          id: e.id,
          nombre: e.nombre,
          precio: e.precio,
          cantidad: e.cantidad,
        });
      }

      guardarCarrito();
      verCarrito();
    });
  });
};

// mostrar seccion de productos "Snacks"
