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

document.querySelectorAll(".carrusel").forEach((carrusel) => {
    const pista = carrusel.querySelector(".carrusel__pista");
    const items = pista.querySelectorAll(".carrusel__item");
    if (items.length < 2) return;

    const paso = () => {
        const gap = parseFloat(getComputedStyle(pista).columnGap) || 0;
        return items[0].getBoundingClientRect().width + gap;
    };
    const maximo = () => pista.scrollWidth - pista.clientWidth - 2;

    const mover = (direccion) => {
        if (direccion > 0 && pista.scrollLeft >= maximo()) {
            pista.scrollTo({ left: 0 });
        } else if (direccion < 0 && pista.scrollLeft <= 2) {
            pista.scrollTo({ left: pista.scrollWidth });
        } else {
            pista.scrollBy({ left: direccion * paso() });
        }
    };

    carrusel.querySelector(".carrusel__flecha--ant").addEventListener("click", () => mover(-1));
    carrusel.querySelector(".carrusel__flecha--sig").addEventListener("click", () => mover(1));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let temporizador = null;
    let enPantalla = false;
    let pausado = false;

    const actualizar = () => {
        clearInterval(temporizador);
        temporizador = null;
        if (enPantalla && !pausado && !document.hidden) {
            temporizador = setInterval(() => mover(1), 4000);
        }
    };
    const pausar = () => { pausado = true; actualizar(); };
    const reanudar = () => { pausado = false; actualizar(); };

    carrusel.addEventListener("mouseenter", pausar);
    carrusel.addEventListener("mouseleave", reanudar);
    carrusel.addEventListener("focusin", pausar);
    carrusel.addEventListener("focusout", reanudar);
    pista.addEventListener("touchstart", pausar, { passive: true });
    pista.addEventListener("touchend", () => setTimeout(reanudar, 3000), { passive: true });
    document.addEventListener("visibilitychange", actualizar);

    if ("IntersectionObserver" in window) {
        new IntersectionObserver(([entrada]) => {
            enPantalla = entrada.isIntersecting;
            actualizar();
        }, { threshold: 0.3 }).observe(carrusel);
    } else {
        enPantalla = true;
        actualizar();
    }
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
