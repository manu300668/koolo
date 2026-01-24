const carritoFlotante = document.getElementById("carrito-flotante");
const carritoCount = document.getElementById("carrito-count");
const carritoSection = document.getElementById("carrito");

// Función para actualizar contador
const actualizarContador = () => {
  carritoCount.textContent = carrito.length;
};

// Abrir/ocultar carrito al click en flotante
carritoFlotante.addEventListener("click", () => {
  carritoSection.scrollIntoView({behavior:"smooth"});
});

// Llamar esta función dentro de renderCarrito()
const renderCarrito = () => {
  carritoItems.innerHTML = '';
  let total = 0;
  carrito.forEach((item, index) => {
    total += item.precio;
    const div = document.createElement('div');
    div.className = 'carrito-item';
    div.innerHTML = `<p>${item.nombre} - ${item.precio}€</p>
                     <button data-index="${index}">Eliminar</button>`;
    carritoItems.appendChild(div);
  });
  carritoTotal.textContent = `Total: ${total}€`;
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarContador();
};
