// SCROLL REVEAL
const reveals = document.querySelectorAll(".reveal");
const revealOnScroll = () => {
  const wH = window.innerHeight;
  const rP = 100;
  reveals.forEach(el => {
    const t = el.getBoundingClientRect().top;
    if (t < wH - rP) el.classList.add("active");
  });
};
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// CARRITO FUNCIONAL
const carritoItems = document.querySelector('.carrito-items');
const carritoTotal = document.querySelector('.carrito-total');
const vaciarBtn = document.querySelector('.vaciar-carrito');
const addBtns = document.querySelectorAll('.btn-cart');

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

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
};

addBtns.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.card');
    const nombre = card.querySelector('h3').textContent;
    const precio = parseFloat(card.querySelector('.precio').textContent.replace('€',''));
    carrito.push({nombre, precio});
    renderCarrito();
  });
});

carritoItems.addEventListener('click', e => {
  if(e.target.tagName === 'BUTTON') {
    const index = e.target.dataset.index;
    carrito.splice(index, 1);
    renderCarrito();
  }
});

vaciarBtn.addEventListener('click', () => {
  carrito = [];
  renderCarrito();
});

renderCarrito();
