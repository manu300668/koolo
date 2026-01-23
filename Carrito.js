let carrito = [];

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    carrito.push({
      producto: 'Sudadera Oversize',
      precio: 65
    });
    alert('Producto añadido al carrito');
  });
});
