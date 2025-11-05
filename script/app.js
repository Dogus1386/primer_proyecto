// Estado SPA y datos de cursos
const state = {
    currentView: 'home',
    courses: [
        {
            id: 'php',
            title: 'PHP desde cero',
            level: 'Principiante',
            duration: '6h',
            description: 'Sintaxis, variables, funciones, formularios, sesiones y conexión a MySQL.',
            image: '../img/php.jpg'
        },
        {
            id: 'python',
            title: 'Python 3 fundamentos',
            level: 'Principiante',
            duration: '8h',
            description: 'Tipos de datos, control de flujo, funciones y módulos. Introducción a scripts.',
            image: '../img/python.jpg'
        },
        {
            id: 'cpp',
            title: 'C++ básico',
            level: 'Intermedio',
            duration: '10h',
            description: 'POO, memoria, vectores, punteros, y buenas prácticas.',
            image: '../img/cpp.jpg'
        },
        {
            id: 'vbnet',
            title: 'VB.NET esencial',
            level: 'Intermedio',
            duration: '7h',
            description: 'Windows Forms, eventos, acceso a datos y patrones simples.',
            image: '../img/vbnet.jpg'
        },
        {
            id: 'mysql',
            title: 'MySQL práctico',
            level: 'Principiante',
            duration: '5h',
            description: 'DDL, DML, JOINS, índices y diseño básico de bases de datos.',
            image: '../img/mysql.jpg'
        },
        {
            id: 'css',
            title: 'CSS moderno',
            level: 'Principiante',
            duration: '6h',
            description: 'Flexbox, Grid, animaciones y diseño responsive.',
            image: '../img/css.jpg'
        },
        {
            id: 'xampp',
            title: 'XAMPP y entorno local',
            level: 'Principiante',
            duration: '3h',
            description: 'Instalación, configuración y despliegue de proyectos PHP/Apache/MySQL.',
            image: '../img/xampp.jpg'
        }
    ]
};

// Utilidades
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

// Sidebar y navegación
function setActiveNav(hash) {
    $$('.nav-link').forEach(a => a.classList.remove('active'));
    const link = document.querySelector(`.nav-link[href="#${hash}"]`);
    if (link) link.classList.add('active');
}

function renderView(view) {
    const content = $('#content');
    state.currentView = view;
    setActiveNav(view);

    if (view === 'home') {
        content.innerHTML = `
            <section>
                <h2>Bienvenido</h2>
                <p>Explora nuestros cursos gratuitos de tecnología y programación.</p>
            </section>
            <section>
                <h2>Cursos destacados</h2>
                <div class="cards">
                    ${state.courses.slice(0, 3).map(renderCourseCard).join('')}
                </div>
            </section>
        `;
    } else if (view === 'courses') {
        content.innerHTML = `
            <section>
                <h2>Todos los cursos</h2>
                <div class="cards">
                    ${state.courses.map(renderCourseCard).join('')}
                </div>
            </section>
        `;
    } else if (view === 'about') {
        content.innerHTML = `
            <section>
                <h2>Sobre nosotros</h2>
                <p>Somos una academia comunitaria que promueve educación tecnológica gratuita y de calidad.</p>
                <p>Aprende a tu ritmo con material práctico y ejemplos reales.</p>
            </section>
        `;
    } else if (view === 'contact') {
        content.innerHTML = `
            <section>
                <h2>Contacto</h2>
                <form id="contactForm" class="card-body" style="max-width:600px;">
                    <input type="text" id="nombre" placeholder="Tu nombre" required>
                    <input type="email" id="email" placeholder="Tu correo" required>
                    <textarea id="mensaje" placeholder="Tu mensaje" rows="5" required></textarea>
                    <div class="card-actions">
                        <button class="btn primary" type="submit">Enviar</button>
                    </div>
                </form>
            </section>
        `;
        $('#contactForm').addEventListener('submit', e => {
            e.preventDefault();
            const nombre = $('#nombre').value.trim();
            const email = $('#email').value.trim();
            const mensaje = $('#mensaje').value.trim();
            if (!nombre || !email || !mensaje) return alert('Completa todos los campos.');
            alert(`Gracias, ${nombre}. Recibimos tu mensaje.`);
            e.target.reset();
        });
    } else if (view === 'faq') {
        content.innerHTML = `
            <section>
                <h2>Preguntas frecuentes</h2>
                <p>Encuentra respuestas rápidas a cómo aprender con nosotros.</p>
            </section>
        `;
    } else if (view.startsWith('course:')) {
        const id = view.split(':')[1];
        const course = state.courses.find(c => c.id === id);
        if (!course) {
            content.innerHTML = `<p class="card">Curso no encontrado.</p>`;
            return;
        }
        content.innerHTML = `
            <section class="card">
                <div class="card-header">
                    <!-- Imagen del curso -->
                    <!-- <img src="${course.image}" alt="${course.title}"> -->
                </div>
                <div class="card-body">
                    <h2 class="card-title">${course.title}</h2>
                    <p class="card-meta">Nivel: ${course.level} • Duración: ${course.duration}</p>
                    <p>${course.description}</p>
                    <div class="card-actions">
                        <button class="btn primary">Inscribirse</button>
                        <button class="btn" onclick="location.hash='#courses'">Volver a cursos</button>
                    </div>
                </div>
            </section>
            <section class="cards">
                ${state.courses.filter(c => c.id !== id).slice(0,3).map(renderCourseCard).join('')}
            </section>
        `;
    }
}

function renderCourseCard(course) {
    return `
        <article class="card">
            <div class="card-header">
                <!-- Imagen placeholder del curso -->
                <!-- <img src="${course.image}" alt="${course.title}"> -->
                <span style="color:#9ca3af">Imagen del curso pendiente</span>
            </div>
            <div class="card-body">
                <h3 class="card-title">${course.title}</h3>
                <p class="card-meta">Nivel: ${course.level} • Duración: ${course.duration}</p>
                <p>${course.description}</p>
                <div class="card-actions">
                    <button class="btn primary" onclick="location.hash='#course:${course.id}'">Ver detalles</button>
                    <button class="btn" onclick="alert('Inscripción simulada a ${course.title}')">Inscribirse</button>
                </div>
            </div>
        </article>
    `;
}

// Hash routing
function onHashChange() {
    const hash = (location.hash || '#home').replace('#', '');
    renderView(hash);
}

// Sidebar responsive
function setupSidebar() {
    const sidebar = $('#sidebar');
    const btn = $('#hamburger');
    btn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });
    // Cierra el sidebar al navegar en móvil
    $$('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1000) sidebar.classList.remove('open');
        });
    });
}

// Búsqueda global
function setupSearch() {
    const input = $('#globalSearch');
    const btn = $('#searchBtn');
    const doSearch = () => {
        const q = input.value.trim().toLowerCase();
        location.hash = '#courses';
        // filtrar y render en la vista de cursos
        const content = $('#content');
        const results = state.courses.filter(c =>
            c.title.toLowerCase().includes(q) ||
            c.description.toLowerCase().includes(q) ||
            c.id.toLowerCase().includes(q)
        );
        content.innerHTML = `
            <section>
                <h2>Resultados de búsqueda</h2>
                <p class="card-meta">${results.length} curso(s) coinciden con "${q || '...' }"</p>
                <div class="cards">
                    ${results.map(renderCourseCard).join('')}
                </div>
            </section>
        `;
        setActiveNav('courses');
    };
    btn.addEventListener('click', doSearch);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
}

// Carrusel básico
function setupCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.slide'));
    const prev = $('#prevSlide');
    const next = $('#nextSlide');
    const dots = $('#carouselDots');
    let idx = 0;

    // dots
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.setAttribute('aria-label', `Ir a slide ${i+1}`);
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goTo(i));
        dots.appendChild(dot);
    });

    function update() {
        track.style.transform = `translateX(-${idx * 100}%)`;
        dots.querySelectorAll('button').forEach((b, i) => {
            b.classList.toggle('active', i === idx);
        });
    }
    function goTo(i) { idx = (i + slides.length) % slides.length; update(); }
    prev.addEventListener('click', () => goTo(idx - 1));
    next.addEventListener('click', () => goTo(idx + 1));

    // autoplay
    setInterval(() => goTo(idx + 1), 6000);
}

// Acordeón
function setupAccordion() {
    $$('.accordion-header').forEach(btn => {
        btn.addEventListener('click', () => {
            const body = btn.nextElementSibling;
            const open = body.style.display === 'block';
            // cerrar otros
            $$('.accordion-body').forEach(b => b.style.display = 'none');
            body.style.display = open ? 'none' : 'block';
        });
    });
}

// Init
window.addEventListener('DOMContentLoaded', () => {
    setupSidebar();
    setupSearch();
    setupCarousel();
    setupAccordion();
    onHashChange();
});
window.addEventListener('hashchange', onHashChange);
