const botonMenu = document.querySelector(".nav__boton");
const menu = document.querySelector(".nav__menu");

botonMenu.addEventListener("click", () => {
    const abierto = menu.classList.toggle("abierto");
    botonMenu.setAttribute("aria-expanded", abierto);
    botonMenu.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
});

menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        menu.classList.remove("abierto");
        botonMenu.setAttribute("aria-expanded", "false");
        botonMenu.setAttribute("aria-label", "Abrir menú");
    });
});

const filtros = document.querySelectorAll(".filtro");
const proyectos = document.querySelectorAll(".proyecto");

filtros.forEach((filtro) => {
    filtro.addEventListener("click", () => {
        filtros.forEach((f) => {
            f.classList.toggle("activo", f === filtro);
            f.setAttribute("aria-pressed", f === filtro);
        });
        const valor = filtro.dataset.filtro;
        proyectos.forEach((proyecto) => {
            proyecto.hidden = valor !== "todos" && proyecto.dataset.estado !== valor;
        });
    });
});

document.querySelectorAll(".desplegar").forEach((boton) => {
    const tareas = document.getElementById(boton.getAttribute("aria-controls"));
    const signo = boton.querySelector("span");
    boton.addEventListener("click", () => {
        const abrir = tareas.hidden;
        tareas.hidden = !abrir;
        boton.setAttribute("aria-expanded", abrir);
        signo.textContent = abrir ? "−" : "+";
    });
});

const elementos = document.querySelectorAll(".revelar");

if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visible");
                observador.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    elementos.forEach((el) => observador.observe(el));
} else {
    elementos.forEach((el) => el.classList.add("visible"));
}
