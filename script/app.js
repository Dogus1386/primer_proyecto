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
      image: '../img/php1.png'
    },
    {
      id: 'python',
      title: 'Python 3 fundamentos',
      level: 'Principiante',
      duration: '8h',
      description: 'Tipos de datos, control de flujo, funciones y módulos. Introducción a scripts.',
      image: '../img/python1.png'
    },
    {
      id: 'cpp',
      title: 'C++ básico',
      level: 'Intermedio',
      duration: '10h',
      description: 'POO, memoria, vectores, punteros, y buenas prácticas.',
      image: '../img/cpp1.png'
    },
    {
      id: 'vbnet',
      title: 'VB.NET esencial',
      level: 'Intermedio',
      duration: '7h',
      description: 'Windows Forms, eventos, acceso a datos y patrones simples.',
      image: '../img/vbnet1.png'
    },
    {
      id: 'mysql',
      title: 'MySQL práctico',
      level: 'Principiante',
      duration: '5h',
      description: 'DDL, DML, JOINS, índices y diseño básico de bases de datos.',
      image: '../img/mysql1.png'
    },
    {
      id: 'css',
      title: 'CSS moderno',
      level: 'Principiante',
      duration: '6h',
      description: 'Flexbox, Grid, animaciones y diseño responsive.',
      image: '../img/css1.png'
    },
    {
      id: 'xampp',
      title: 'XAMPP y entorno local',
      level: 'Principiante',
      duration: '3h',
      description: 'Instalación, configuración y despliegue de proyectos PHP/Apache/MySQL.',
      image: '../img/xampp1.png'
    }
  ]
};

// Utilidades
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

// Navegación SPA
function setActiveNav(hash) {
  $$('.nav-link').forEach(a => a.classList.remove('active'));
  const link = document.querySelector(`.nav-link[href="#${hash}"]`);
  if (link) link.classList.add('active');
}

function renderCourseCard(course) {
  return `
    <article class="card">
      <div class="card-header">
        <img src="${course.image}" alt="${course.title}">
      </div>
      <div class="card-body">
        <h3 class="card-title">${course.title}</h3>
        <p class="card-meta">Nivel: ${course.level} · Duración: ${course.duration}</p>
        <p>${course.description}</p>
        <div class="card-actions">
          <button class="btn primary" onclick="location.hash='#course:${course.id}'">Ver detalles</button>
          <button class="btn" onclick="alert('Inscripción simulada a ${course.title}')">Inscribirse</button>
        </div>
      </div>
    </article>
  `;
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
          ${state.courses.slice(0, 3).map(renderCourseCard).join("")}
        </div>
      </section>
    `;
  } else if (view === 'courses') {
    content.innerHTML = `
      <section>
        <h2>Todos los cursos</h2>
        <div class="cards">
          ${state.courses.map(renderCourseCard).join("")}
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
          <img src="${course.image}" alt="${course.title}">
        </div>
        <div class="card-body">
          <h2 class="card-title">${course.title}</h2>
          <p class="card-meta">Nivel: ${course.level} · Duración: ${course.duration}</p>
          <p>${course.description}</p>
          <div class="card-actions">
            <button class="btn primary">Inscribirse</button>
            <button class="btn" onclick="location.hash='#courses'">Volver a cursos</button>
          </div>
        </div>
      </section>
      <section class="cards">
        ${state.courses.filter(c => c.id !== id).slice(0, 3).map(renderCourseCard).join("")}
      </section>
    `;
  }
}

// SPA routing
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
    const results = state.courses.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q)
    );
    const content = $('#content');
    content.innerHTML = `
      <section>
        <h2>Resultados de búsqueda</h2>
        <p class="card-meta">${results.length} curso(s) coinciden con "${q || '...'}"</p>
        <div class="cards">
          ${results.map(renderCourseCard).join("")}
        </div>
      </section>
    `;
    setActiveNav('courses');
  };
  btn.addEventListener('click', doSearch);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
}

// Carrusel
function setupCarousel() {
  const track = $('.carousel-track');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const prev = $('#prevSlide');
  const next = $('#nextSlide');
  const dots = $('#carouselDots');
  let idx = 0;

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.setAttribute('aria-label', `Ir a slide ${i + 1}`);
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

function goTo(i) {
  idx = (i + slides.length) % slides.length;
  update();
}

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
      $$('.accordion-body').forEach(b => b.style.display = 'none');
      body.style.display = open ? 'none' : 'block';
    });
  });
}




// Login y registro
// Login y registro
function setupAuth() {
  const loginForm = $('#loginForm');
  const loginMessage = $('#loginMessage');
  const registerForm = $('#registerForm');
  const registerMessage = $('#registerMessage');
  const showRegisterBtn = $('#showRegisterBtn');
  const registerBox = $('#registerBox');

  if (showRegisterBtn && registerBox) {
    showRegisterBtn.addEventListener('click', () => {
      registerBox.style.display = 'block';
      showRegisterBtn.style.display = 'none';
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(loginForm);

      fetch('../login/validar_login.php', {
        method: 'POST',
        body: formData
      })
        .then(res => res.json())
        .then(data => {

            if (data.success) {

       
  // Opcional: mostrar mensaje antes de recargar
  loginMessage.textContent = `Bienvenido, ${data.nombre}`;
  
  // Refrescar la página para que PHP muestre el estado correcto
  setTimeout(() => {
    location.reload();
  }, 0.1); // espera 1 segundo para que el usuario vea el mensaje





          } else {
            loginMessage.textContent = data.error;
          }
        })
        .catch(err => {
          loginMessage.textContent = "Error de conexión.";
          console.error(err);
        });
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(registerForm);

      fetch('../registro/registro.php', {
        method: 'POST',
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          registerMessage.textContent = data.success
            ? "Registro exitoso. Ahora puedes iniciar sesión."
            : data.error;
          if (data.success) registerForm.reset();
        })
        .catch(err => {
          registerMessage.textContent = "Error de conexión.";
          console.error(err);
        });
    });
  }
}




// Inicialización
window.addEventListener('DOMContentLoaded', () => {
  setupSidebar();
  setupSearch();
  setupCarousel();
  setupAccordion();
  setupAuth();
  onHashChange();
});

window.addEventListener('hashchange', onHashChange);

