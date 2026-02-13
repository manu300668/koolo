// Productos de ejemplo
const products=[
  {name:"Camiseta Koolo",price:20},
  {name:"Sudadera Koolo",price:35},
  {name:"Gorra Koolo",price:15}
];

// Elementos del DOM
const productsDiv=document.getElementById("products");
const cartDiv=document.getElementById("cart");
const cartBtn=document.getElementById("cartBtn");
const cartItems=document.getElementById("cartItems");
const cartCount=document.getElementById("cart-count");
const loginBtn=document.getElementById("login-btn");

let cart=[];

// Mostrar productos
products.forEach(p=>{
  const d=document.createElement("div");
  d.className="product";
  d.innerHTML=`
    <h3>${p.name}</h3>
    <p>${p.price}€</p>
    <button>Añadir</button>
  `;
  d.querySelector("button").onclick=()=>{
    cart.push(p);
    drawCart();
  };
  productsDiv.appendChild(d);
});

// Dibujar carrito
function drawCart(){
  cartItems.innerHTML="";
  cart.forEach((p,i)=>{
    cartItems.innerHTML+=`${p.name} ${p.price}€ <button onclick="removeItem(${i})">X</button><br>`;
  });
  cartCount.textContent = cart.length;
}

// Quitar item del carrito
function removeItem(index){
  cart.splice(index,1);
  drawCart();
}

// Abrir/cerrar carrito
cartBtn.onclick=()=>{
  cartDiv.classList.toggle("open");
}

// Login (ejemplo solo alerta)
loginBtn.onclick = ()=>{
  alert("Aquí iría el login / panel usuario");
}
