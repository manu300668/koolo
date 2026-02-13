const products=[
{name:"Camiseta Koolo",price:20},
{name:"Sudadera Koolo",price:35},
{name:"Gorra Koolo",price:15}
];

const productsDiv=document.getElementById("products");
const cartDiv=document.getElementById("cart");
const cartBtn=document.getElementById("cartBtn");
const cartItems=document.getElementById("cartItems");

let cart=[];

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

function drawCart(){
cartItems.innerHTML="";
cart.forEach(p=>{
cartItems.innerHTML+=`${p.name} ${p.price}€<br>`;
});
}

cartBtn.onclick=()=>{
cartDiv.classList.toggle("open");
};
