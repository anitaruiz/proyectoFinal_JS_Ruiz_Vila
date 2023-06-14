// variables globales

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const cards = document.querySelector("#cards");
const carritoBtn = document.querySelector("#carritoBtn");
const comprarBtn = document.querySelector("#comprarBtn");
const listaProductos = document.querySelector("#cards");

// redireccion a finalizar compra

function redireccionFinalizar() {
  if (carrito.length === 0) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Carrito vacio!",
      showConfirmButton: false,
      timer: 2000,
    });
  } else {
    location.href = "html/finalizarCompra.html";
  }
}

// redireccion a finalizar compra

// variables globales

// guardar carrito en local

const guardarCarrito = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

// guardar carrito en local

// 1.1 mostrar productos del carrito

const carritoCompra = document.querySelector("#carrito");
const totalPrecio = document.querySelector("#total");

const verCarrito = () => {
  carritoCompra.innerHTML = "";
  totalPrecio.innerHTML = "Total: 0";
  carrito.forEach((e) => {
    const products = document.createElement("div");
    products.className = "text-center p-3 bg-warning text-dark";
    products.innerHTML = `<h5>${e.nombre}</h5>
    <p>$${e.precio} X ${e.cantidad}</p>
    <button class="btn btn-dark mb-2 deleteBtn${e.id}">Eliminar</button>
    `;

    carritoCompra.append(products);

    // 1.2 eliminar producto

    let eliminar = carritoCompra.querySelector(`.deleteBtn${e.id}`);
    eliminar.addEventListener("click", () => {
      eliminarE(e.id);
    });

    const eliminarE = (id) => {
      const dltId = carrito.find((e) => e.id === id);
      carrito = carrito.filter((eid) => {
        return eid !== dltId;
      });
      guardarCarrito();
      verCarrito();
    };

    // 1.2 eliminar producto

    // 1.3 precio total

    const total = carrito.reduce((acc, e) => acc + e.precio * e.cantidad, 0);
    totalPrecio.innerText = `Total: $${total}`;

    // 1.3 precio total
  });
};

carritoBtn.addEventListener("click", verCarrito);

// 1.1 mostrar productos del carrito

// vaciar carrito

const vaciarCarrito = document.querySelector("#vaciarBtn");
vaciarCarrito.addEventListener("click", () => {
  localStorage.clear();
  carritoCompra.innerHTML = "";
  carrito = [];
  totalPrecio.innerHTML = `Total: 0`;
});

// vaciar carrito
