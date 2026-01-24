const reveals=document.querySelectorAll(".reveal");
const revealOnScroll=()=>{const wH=window.innerHeight;const rP=100;reveals.forEach(el=>{const t=el.getBoundingClientRect().top;if(t<wH-rP)el.classList.add("active");});};
window.addEventListener("scroll",revealOnScroll);
window.addEventListener("load",revealOnScroll);
