// Productos iniciales
let products = [
  {name:"Camiseta Koolo",price:20,img:"img/camiseta.png"},
  {name:"Sudadera Koolo",price:35,img:"img/sudadera.png"},
  {name:"Gorra Koolo",price:15,img:"img/gorra.png"}
];

const productsDiv=document.getElementById("products");
const cartDiv=document.getElementById("cart");
const cartBtn=document.getElementById("cartBtn");
const cartItems=document.getElementById("cartItems");
const cartCount=document.getElementById("cart-count");
const loginBtn=document.getElementById("login-btn");

// Admin
const adminBtn=document.getElementById("admin-btn");
const adminModal=document.getElementById("admin-modal");
const closeAdmin=document.getElementById("close-admin");
const adminLoginSubmit=document.getElementById("admin-login-submit");
const adminPanel=document.getElementById("admin-panel");
const closeAdminPanel=document.getElementById("close-admin-panel");
const adminLogo=document.getElementById("admin-logo");
const adminColor=document.getElementById("admin-color");
const adminInstagram=document.getElementById("admin-instagram");
const adminProductsDiv=document.getElementById("admin-products");
const adminAddProduct=document.getElementById("admin-add-product");
const adminSave=document.getElementById("admin-save");

let cart=[];

// Dibujar productos con imágenes
function drawProducts(){
  productsDiv.innerHTML="";
  products.forEach((p,i)=>{
    const d=document.createElement("div");
    d.className="product";
    d.innerHTML=`
      <img src="${p.img}" alt="${p.name}">
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
}
drawProducts();

// Carrito
function drawCart(){
  cartItems.innerHTML="";
  cart.forEach((p,i)=>{
    cartItems.innerHTML+=`${p.name} ${p.price}€ <button onclick="removeItem(${i})">X</button><br>`;
  });
  cartCount.textContent = cart.length;
}
function removeItem(i){cart.splice(i,1); drawCart();}
cartBtn.onclick=()=>{cartDiv.classList.toggle("open");}

// Login usuario (simulado)
const loginModal=document.getElementById("login-modal");
const closeLogin=document.getElementById("close-login");
const loginSubmit=document.getElementById("login-submit");
loginBtn.onclick=()=>{loginModal.style.display="block";}
closeLogin.onclick=()=>{loginModal.style.display="none";}
window.onclick=(e)=>{if(e.target==loginModal){loginModal.style.display="none";}}
loginSubmit.onclick=()=>{
  const email=document.getElementById("login-email").value;
  const pass=document.getElementById("login-pass").value;
  alert(`Login simulado:\nCorreo: ${email}\nContraseña: ${pass}`);
  loginModal.style.display="none";
}

// Admin login
const ADMIN_PASSWORD="1234"; // cambiar por tu contraseña
adminBtn.onclick=()=>{adminModal.style.display="block";}
closeAdmin.onclick=()=>{adminModal.style.display="none";}
adminLoginSubmit.onclick=()=>{
  const pass=document.getElementById("admin-pass").value;
  if(pass===ADMIN_PASSWORD){
    adminModal.style.display="none";
    openAdminPanel();
  } else { alert("Contraseña incorrecta"); }
}

closeAdminPanel.onclick=()=>{adminPanel.style.display="none";}

function openAdminPanel(){
  adminPanel.style.display="block";
  adminLogo.value=document.getElementById("logo").src;
  adminColor.value="#ffffff";
  adminInstagram.value=localStorage.getItem("instagram")||"";
  renderAdminProducts();
}

// Admin productos con imágenes y subida desde PC/móvil
function renderAdminProducts(){
  adminProductsDiv.innerHTML="";
  products.forEach((p,i)=>{
    const d=document.createElement("div");
    d.className="admin-product";
    d.innerHTML=`
      <img src="${p.img}" alt="${p.name}">
      <input type="text" value="${p.name}" placeholder="Nombre">
      <input type="number" value="${p.price}" placeholder="Precio">
      <input type="file" id="upload-${i}">
      <button onclick="removeAdminProduct(${i})">Eliminar</button>
    `;
    adminProductsDiv.appendChild(d);

    // Evento para subir imagen
    const fileInput = document.getElementById(`upload-${i}`);
    fileInput.addEventListener("change", (e)=>{
      const reader = new FileReader();
      reader.onload = function(ev){
        p.img = ev.target.result; // imagen en base64
        renderAdminProducts();    // refresca preview
        drawProducts();           // refresca tienda
      }
      reader.readAsDataURL(e.target.files[0]);
    });
  });
}

adminAddProduct.onclick=()=>{
  products.push({name:"Nuevo producto",price:0,img:"img/logo.png"});
  renderAdminProducts();
}
window.removeAdminProduct=(i)=>{products.splice(i,1); renderAdminProducts();}

// Guardar cambios admin
adminSave.onclick=()=>{
  // Logo
  document.getElementById("logo").src=adminLogo.value;
  // Color cabecera
  document.querySelector("header").style.backgroundColor=adminColor.value;
  // Instagram
  localStorage.setItem("instagram",adminInstagram.value);
  // Productos
  const inputs=adminProductsDiv.querySelectorAll("input[type=text],input[type=number]");
  for(let i=0;i<products.length;i++){
    products[i].name=inputs[i*2].value;
    products[i].price=parseFloat(inputs[i*2+1].value);
    // la imagen ya se subió en base64
  }
  drawProducts();
  alert("Cambios guardados!");
  adminPanel.style.display="none";
  }
