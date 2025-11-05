<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="description" content="Academia Dogus Dev: cursos gratis de programación y tecnología con contenido moderno y navegación interna.">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Academia PRODUCTOUNO</title>
    <link rel="stylesheet" href="../CSS/style.css">
</head>
<body>
    <!-- Sidebar lateral -->
    <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
            <img src="../img/logo.png" alt="Logo" class="logo">
            <h2>Dogus Dev</h2>
        </div>
        <nav class="sidebar-nav">
            <ul>
                <li><a href="#home" class="nav-link active">Inicio</a></li>
                <li><a href="#courses" class="nav-link">Cursos</a></li>
                <li><a href="#about" class="nav-link">Sobre nosotros</a></li>
                <li><a href="#contact" class="nav-link">Contacto</a></li>
                <li><a href="#faq" class="nav-link">Preguntas frecuentes</a></li>
            </ul>
        </nav>
        <div class="sidebar-footer">
            <small>&copy; 2025 Dogus Dev</small>
        </div>
    </aside>

    <!-- Contenedor principal -->
    <div class="page">
        <!-- Topbar -->
        <header class="topbar">
            <button id="hamburger" class="hamburger" aria-label="Abrir menú">
                <span></span><span></span><span></span>
            </button>
            <h1>Academia PRODUCTOUNO</h1>
            <div class="search-box">
                <input type="text" id="globalSearch" placeholder="Buscar cursos, temas, palabras clave...">
                <button id="searchBtn">Buscar</button>
            </div>
        </header>

        <!-- Carrusel -->
        <section class="hero-carousel">
            <div class="carousel" id="carousel">
                <div class="carousel-track">
                    <div class="slide">
                        <img src="../img/hero1.jpg" alt="Hero 1">
                        <div class="slide-caption">
                            <h3>Aprende programación desde cero</h3>
                            <p>PHP, Python, C++, VB.NET, MySQL, CSS, XAMPP</p>
                        </div>
                    </div>
                    <div class="slide">
                        <img src="../img/hero2.jpg" alt="Hero 2">
                        <div class="slide-caption">
                            <h3>Cursos 100% gratuitos</h3>
                            <p>Contenido práctico, ejemplos y ejercicios guiados</p>
                        </div>
                    </div>
                    <div class="slide">
                        <img src="../img/hero3.jpg" alt="Hero 3">
                        <div class="slide-caption">
                            <h3>Navegación moderna y rápida</h3>
                            <p>SPA sencilla, contenido cargado sin salir de la página</p>
                        </div>
                    </div>
                </div>
                <button class="carousel-btn prev" id="prevSlide" aria-label="Anterior">&#10094;</button>
                <button class="carousel-btn next" id="nextSlide" aria-label="Siguiente">&#10095;</button>
                <div class="carousel-dots" id="carouselDots"></div>
            </div>
        </section>

        <!-- Banners informativos -->
        <section class="info-banners">
            <div class="banner">
                <img src="../img/banner1.jpg" alt="Banner 1">
                <div class="banner-content">
                    <h3>Certificados próximos</h3>
                    <p>Muy pronto podrás obtener certificados de finalización.</p>
                </div>
            </div>
            <div class="banner">
                <img src="../img/banner2.jpg" alt="Banner 2">
                <div class="banner-content">
                    <h3>Comunidad activa</h3>
                    <p>Únete a nuestra comunidad para aprender colaborativamente.</p>
                </div>
            </div>
        </section>

        <!-- Contenido dinámico SPA -->
        <main id="content" class="content">
            <!-- Vista por defecto renderizada desde JS (home/courses/about/contact/faq) -->
        </main>

        <!-- Acordeón informativo -->
        <section class="accordion-section">
            <h2>Información importante</h2>
            <div class="accordion" id="accordion">
                <div class="accordion-item">
                    <button class="accordion-header">¿Cómo funcionan los cursos?</button>
                    <div class="accordion-body">
                        <p>Los cursos son totalmente gratuitos, con lecciones y recursos de libre acceso.</p>
                    </div>
                </div>
                <div class="accordion-item">
                    <button class="accordion-header">¿Necesito registrarme?</button>
                    <div class="accordion-body">
                        <p>No por ahora. Próximamente habilitaremos una cuenta para guardar tu progreso.</p>
                    </div>
                </div>
                <div class="accordion-item">
                    <button class="accordion-header">¿Puedo contribuir?</button>
                    <div class="accordion-body">
                        <p>¡Sí! Podrás sugerir mejoras, reportar errores y proponer nuevos contenidos.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="footer">
            <p>&copy; 2025 PRODUCTOUNO - Todos los derechos reservados</p>
        </footer>
    </div>

    <script src="../script/app.js"></script>
</body>
</html>
