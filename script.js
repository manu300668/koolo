let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function actualizarContador() {
  document.getElementById('contador').textContent = carrito.length;
}

document.querySelectorAll('.btn-agregar').forEach(btn => {
  btn.addEventListener('click', e => {
    const productoDiv = e.target.closest('.producto');
    const producto = {
      id: productoDiv.dataset.id,
      nombre: productoDiv.querySelector('h2').textContent,
      precio: parseFloat(productoDiv.dataset.precio)
    };
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
  });
});

actualizarContador();

// PAYPAL LIVE
if (typeof paypal !== "undefined") {
  paypal.Buttons({
    createOrder: function (data, actions) {
      const total = carrito.reduce((sum, item) => sum + item.precio, 0);
      if (total === 0) { alert("El carrito está vacío"); return; }
      return actions.order.create({
        purchase_units: [{ amount: { value: total.toFixed(2) } }]
      });
    },
    onApprove: async function(data, actions) {
      await actions.order.capture();
      await enviarPedido({ nombre: "Cliente ejemplo", email: "cliente@email.com" });
      carrito = [];
      localStorage.removeItem('carrito');
      window.location.href = "gracias.html";
    }
  }).render("#paypal-button-container");
}

// FUNCION PARA BACKEND (Firebase)
async function enviarPedido(cliente) {
  const nuevoPedido = firebase.functions().httpsCallable('nuevoPedido');
  await nuevoPedido({ cliente, carrito, total: carrito.reduce((a,b)=>a+b.precio,0) });
}
