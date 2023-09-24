const menu = document.querySelector(".btn-mobile-nav");
const nav = document.querySelector(".nav");
const setMenu = () => nav.classList.toggle("nav-open");
menu.addEventListener("click", setMenu);
