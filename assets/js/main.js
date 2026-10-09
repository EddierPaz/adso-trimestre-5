document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // REFERENCIAS AL DOM
    // ============================================
    const body = document.body;
    const darkmodeBtn = document.getElementById('darkmode-toggle');
    const darkmodeIcon = darkmodeBtn.querySelector('i');
    const gameToggle = document.getElementById('game-toggle');
    const gameIcon = gameToggle.querySelector('#game-icon');
    const gameText = gameToggle.querySelector('#game-text');

    const container = document.getElementById('universe-container');
    const canvas = document.getElementById('universe-canvas');
    const ctx = canvas.getContext('2d');
    const centerBtn = document.getElementById('center-universe-btn');
    const panel = document.getElementById('project-panel');
    const closePanelBtn = document.getElementById('close-panel-btn');
    const filterUniverseBtns = document.querySelectorAll('.universe-filter');
    const exitUniverseBtn = document.getElementById('exit-universe-btn');

    // Cursor personalizado
    const cursorEl = document.createElement('div');
    cursorEl.className = 'universe-cursor';
    document.body.appendChild(cursorEl);

    // ============================================
    // MODO LECTURA — TEMA Y NAVEGACIÓN
    // ============================================
    darkmodeBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        darkmodeIcon.classList.toggle('fa-moon', !isDark);
        darkmodeIcon.classList.toggle('fa-sun', isDark);
    });

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (scrollY >= top && scrollY < top + section.clientHeight) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    });

    document.querySelectorAll('.btn-filter').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // ============================================
    // DATOS DE PROYECTOS
    // ============================================
    const projectsData = {
        // ============ BACKEND (Python + MySQL) ============
        'crud-mysql-1': {
            id: 'crud-mysql-1',
            name: 'CRUD MySQL',
            subtitle: 'Backend / Arquitectura básica',
            status: 'Completado',
            year: '2025',
            description: 'CRUD completo en Python con conexión a MySQL. Implementa operaciones Crear, Leer, Actualizar y Eliminar con Programación Orientada a Objetos.',
            technologies: ['Python', 'MySQL', 'POO'],
            category: 'backend',
            link: 'https://github.com/EddierPaz/Portafolio-Eddier-Paz/tree/main/proyectos/backend/crud-mysql-1',
            repo: 'https://github.com/EddierPaz/Portafolio-Eddier-Paz/tree/main/proyectos/backend/crud-mysql-1',
            gallery: ['Estructura', 'Conexión', 'CRUD'],
            x: 0, y: 0, radius: 55, glowColor: '#3776AB'
        },
        'crud-mysql-2': {
            id: 'crud-mysql-2',
            name: 'CRUD MySQL v2',
            subtitle: 'Backend / Por capas',
            status: 'Completado',
            year: '2025',
            description: 'Segunda versión del CRUD con arquitectura por capas: config/, models/ y services/ para separar responsabilidades.',
            technologies: ['Python', 'MySQL', 'POO'],
            category: 'backend',
            link: 'https://github.com/EddierPaz/Portafolio-Eddier-Paz/tree/main/proyectos/backend/crud-mysql-2',
            repo: 'https://github.com/EddierPaz/Portafolio-Eddier-Paz/tree/main/proyectos/backend/crud-mysql-2',
            gallery: ['Config', 'Models', 'Services'],
            x: 0, y: 0, radius: 50, glowColor: '#1E40AF'
        },
        'crud-operpan': {
            id: 'crud-operpan',
            name: 'CRUD OperPan',
            subtitle: 'Backend / Sistema real',
            status: 'Destacado',
            year: '2025',
            description: 'CRUD aplicado a un caso real: gestión de operaciones y panadería. Incluye módulos de productos, ventas y clientes.',
            technologies: ['Python', 'MySQL', 'POO'],
            category: 'backend',
            link: 'https://github.com/EddierPaz/Portafolio-Eddier-Paz/tree/main/proyectos/backend/crud-mysql-operpan',
            repo: 'https://github.com/EddierPaz/Portafolio-Eddier-Paz/tree/main/proyectos/backend/crud-mysql-operpan',
            gallery: ['Productos', 'Ventas', 'Clientes', 'Reportes'],
            x: 0, y: 0, radius: 60, glowColor: '#7C3AED'
        },
        'poo': {
            id: 'poo',
            name: 'Fundamentos POO',
            subtitle: 'Backend / POO',
            status: 'Completado',
            year: '2025',
            description: 'Prácticas de POO en Python: clases, herencia, encapsulamiento, polimorfismo, métodos especiales y abstracción.',
            technologies: ['Python', 'POO'],
            category: 'backend',
            link: 'https://github.com/EddierPaz/Portafolio-Eddier-Paz/tree/main/proyectos/backend/fundamentos-poo',
            repo: 'https://github.com/EddierPaz/Portafolio-Eddier-Paz/tree/main/proyectos/backend/fundamentos-poo',
            gallery: ['Clases', 'Herencia', 'Polimorfismo'],
            x: 0, y: 0, radius: 45, glowColor: '#FFD43B'
        },

        // ============ FRONTEND (HTML + CSS) ============
        'laika': {
            id: 'laika',
            name: 'Laika',
            subtitle: 'Frontend / CSS puro',
            status: 'Destacado',
            year: '2025',
            description: 'Tienda de mascotas con diseño responsive: header fijo, menú desplegable, grillas Flexbox y secciones con imágenes.',
            technologies: ['HTML', 'CSS', 'Flexbox'],
            category: 'web',
            link: './proyectos/frontend/laika/index.html',
            repo: 'https://github.com/EddierPaz/Portafolio-Eddier-Paz/tree/main/proyectos/frontend/laika',
            gallery: ['Home', 'Menú', 'Productos', 'Footer'],
            x: 0, y: 0, radius: 65, glowColor: '#FFB050'
        },
        'laika-bootstrap': {
            id: 'laika-bootstrap',
            name: 'Laika Bootstrap',
            subtitle: 'Frontend / Bootstrap 5',
            status: 'Completado',
            year: '2025',
            description: 'Reconstrucción del sitio Laika con Bootstrap: grillas responsive, carousels, mega-menús y componentes nativos.',
            technologies: ['HTML', 'CSS', 'Bootstrap'],
            category: 'web',
            link: './proyectos/frontend/laika-bootstrap/index.html',
            repo: 'https://github.com/EddierPaz/Portafolio-Eddier-Paz/tree/main/proyectos/frontend/laika-bootstrap',
            gallery: ['Carousel', 'Grid', 'Mega-menu', 'Cards'],
            x: 0, y: 0, radius: 60, glowColor: '#7952B3'
        },
        'flexbox': {
            id: 'flexbox',
            name: 'Guía Flexbox',
            subtitle: 'Frontend / Layouts modernos',
            status: 'Completado',
            year: '2025',
            description: 'Ejercicios prácticos de Flexbox: contenedores, ítems, direcciones, alineación y proporciones comentadas paso a paso.',
            technologies: ['HTML', 'CSS', 'Flexbox'],
            category: 'web',
            link: './proyectos/frontend/flexbox/index.html',
            repo: 'https://github.com/EddierPaz/Portafolio-Eddier-Paz/tree/main/proyectos/frontend/flexbox',
            gallery: ['Row', 'Column', 'flex: 3 vs 1'],
            x: 0, y: 0, radius: 40, glowColor: '#06B6D4'
        },
        'bootstrap': {
            id: 'bootstrap',
            name: 'Bootstrap Completo',
            subtitle: 'Frontend / Componentes',
            status: 'Completado',
            year: '2025',
            description: 'Ejercicios con el sistema de grillas, cards, modals, navbar, carousels y utilidades de Bootstrap 5.',
            technologies: ['HTML', 'CSS', 'Bootstrap'],
            category: 'web',
            link: './proyectos/frontend/bootstrap/index.html',
            repo: 'https://github.com/EddierPaz/Portafolio-Eddier-Paz/tree/main/proyectos/frontend/bootstrap',
            gallery: ['Grid', 'Cards', 'Modals', 'Forms'],
            x: 0, y: 0, radius: 45, glowColor: '#563D7C'
        },
        'exposicion': {
            id: 'exposicion',
            name: 'Material Exposición',
            subtitle: 'Frontend / Demos',
            status: 'Completado',
            year: '2025',
            description: 'Demos usados en exposiciones: tooltips, scrollspy, Popovers y ejemplos de componentes interactivos.',
            technologies: ['HTML', 'Bootstrap'],
            category: 'web',
            link: './proyectos/frontend/exposicion/',
            repo: 'https://github.com/EddierPaz/Portafolio-Eddier-Paz/tree/main/proyectos/frontend/exposicion',
            gallery: ['Tooltips', 'Scrollspy', 'Popovers'],
            x: 0, y: 0, radius: 38, glowColor: '#F59E0B'
        },

        // ============ JAVASCRIPT (Apps interactivas) ============
        'calculadora': {
            id: 'calculadora',
            name: 'Calculadora',
            subtitle: 'JS / Lógica y DOM',
            status: 'Completado',
            year: '2026',
            description: 'Calculadora funcional con operaciones básicas, manejo de errores y diseño limpio. Usa eval() controlado y actualización en tiempo real.',
            technologies: ['HTML', 'CSS', 'JavaScript'],
            category: 'js',
            link: './proyectos/JS/01-Calculadora/index.html',
            repo: 'https://github.com/EddierPaz/Portafolio-Eddier-Paz/tree/main/proyectos/JS/01-Calculadora',
            gallery: ['Interfaz', 'Operaciones', 'Errores'],
            x: 0, y: 0, radius: 42, glowColor: '#F7DF1E'
        },
        'tareas': {
            id: 'tareas',
            name: 'App de Tareas',
            subtitle: 'JS / LocalStorage',
            status: 'Completado',
            year: '2026',
            description: 'Gestor de tareas con persistencia en localStorage, filtros por estado (todas/pendientes/completadas) y categorías personalizables.',
            technologies: ['HTML', 'CSS', 'JavaScript'],
            category: 'js',
            link: './proyectos/JS/02-App-tareas/index.html',
            repo: 'https://github.com/EddierPaz/Portafolio-Eddier-Paz/tree/main/proyectos/JS/02-App-tareas',
            gallery: ['Lista', 'Filtros', 'Estadísticas'],
            x: 0, y: 0, radius: 48, glowColor: '#E94560'
        },
        'clima': {
            id: 'clima',
            name: 'Dashboard Clima',
            subtitle: 'JS / API REST + Chart.js',
            status: 'Destacado',
            year: '2026',
            description: 'Consumo de la API OpenWeather con gráficas de pronóstico a 5 días usando Chart.js. Incluye búsqueda por ciudad y detalles de humedad, viento y visibilidad.',
            technologies: ['JavaScript', 'API REST', 'Chart.js'],
            category: 'js',
            link: './proyectos/JS/03-Dashboard-clima/index.html',
            repo: 'https://github.com/EddierPaz/Portafolio-Eddier-Paz/tree/main/proyectos/JS/03-Dashboard-clima',
            gallery: ['Clima actual', 'Pronóstico', 'Gráfica', 'Búsqueda'],
            x: 0, y: 0, radius: 55, glowColor: '#22D3EE'
        }
    };

    // ============================================
    // ESTADO DEL UNIVERSO
    // ============================================
    const state = {
        offsetX: 0, offsetY: 0, zoom: 1,
        isDragging: false, dragStartX: 0, dragStartY: 0,
        startOffsetX: 0, startOffsetY: 0,
        selectedProject: null, hoveredProject: null,
        filter: 'all', animFrame: null,
        particles: [], stars: [], time: 0
    };

    const techOrbitMultiplier = 1.8;

    // ✅ LAYOUT CORREGIDO: dos anillos concéntricos con los 12 proyectos reales
    function layoutPlanets() {
        const ids = Object.keys(projectsData);
        const startAngle = -Math.PI / 2;

        // Anillo interior: backend (4 proyectos)
        const innerRing = ids.filter(id => projectsData[id].category === 'backend');
        // Anillo exterior: resto (frontend + js)
        const outerRing = ids.filter(id => projectsData[id].category !== 'backend');

        innerRing.forEach((id, i) => {
            const angle = startAngle + (i * (Math.PI * 2)) / innerRing.length;
            projectsData[id].x = Math.cos(angle) * 280;
            projectsData[id].y = Math.sin(angle) * 280;
        });

        outerRing.forEach((id, i) => {
            const angle = startAngle + ((i + 0.5) * (Math.PI * 2)) / outerRing.length;
            projectsData[id].x = Math.cos(angle) * 580;
            projectsData[id].y = Math.sin(angle) * 580;
        });
    }
    layoutPlanets();

    // Partículas y estrellas
    function initParticles() {
        state.particles = [];
        for (let i = 0; i < 120; i++) {
            state.particles.push({
                x: (Math.random() - 0.5) * 2000,
                y: (Math.random() - 0.5) * 2000,
                radius: Math.random() * 1.5 + 0.5,
                speed: 0.02 + Math.random() * 0.03,
                opacity: 0.3 + Math.random() * 0.5,
                phase: Math.random() * Math.PI * 2
            });
        }
    }
    function initStars() {
        state.stars = [];
        for (let i = 0; i < 300; i++) {
            state.stars.push({
                x: (Math.random() - 0.5) * 3000,
                y: (Math.random() - 0.5) * 3000,
                radius: Math.random() * 1.2 + 0.3,
                opacity: 0.2 + Math.random() * 0.6
            });
        }
    }
    initParticles();
    initStars();

    // ============================================
    // FUNCIONES DE DIBUJO
    // ============================================
    function drawBackground() {
        const grad = ctx.createRadialGradient(
            state.offsetX, state.offsetY, 0,
            state.offsetX, state.offsetY, 600 * state.zoom
        );
        grad.addColorStop(0, '#12121E');
        grad.addColorStop(0.5, '#0D0D16');
        grad.addColorStop(1, '#07070C');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function drawStars() {
        state.stars.forEach(star => {
            const sx = (star.x + state.offsetX) * state.zoom + canvas.width / 2;
            const sy = (star.y + state.offsetY) * state.zoom + canvas.height / 2;
            ctx.beginPath();
            ctx.arc(sx, sy, star.radius * state.zoom, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
            ctx.fill();
        });
    }

    function drawParticles() {
        state.particles.forEach(p => {
            const px = (p.x + state.offsetX) * state.zoom + canvas.width / 2;
            const py = (p.y + state.offsetY) * state.zoom + canvas.height / 2;
            const opacity = p.opacity * (0.8 + 0.2 * Math.sin(state.time * p.speed + p.phase));
            ctx.beginPath();
            ctx.arc(px, py, p.radius * state.zoom, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(167, 139, 250, ${opacity * 0.4})`;
            ctx.fill();
        });
    }

    function drawOrbit(project) {
        const cx = (project.x + state.offsetX) * state.zoom + canvas.width / 2;
        const cy = (project.y + state.offsetY) * state.zoom + canvas.height / 2;
        const radius = project.radius * state.zoom * techOrbitMultiplier;
        ctx.beginPath();
        ctx.ellipse(cx, cy, radius, radius, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(124, 58, 237, 0.15)';
        ctx.lineWidth = 1 * state.zoom;
        ctx.setLineDash([4, 8]);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    function drawPlanet(project, isSelected, isHovered) {
        const cx = (project.x + state.offsetX) * state.zoom + canvas.width / 2;
        const cy = (project.y + state.offsetY) * state.zoom + canvas.height / 2;
        const radius = project.radius * state.zoom;

        const glowSize = isSelected ? radius * 3 : (isHovered ? radius * 2.5 : radius * 1.8);
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowSize);
        grad.addColorStop(0, project.glowColor + '40');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, glowSize, 0, Math.PI * 2);
        ctx.fill();

        const grad2 = ctx.createRadialGradient(cx - radius * 0.2, cy - radius * 0.2, radius * 0.1, cx, cy, radius);
        grad2.addColorStop(0, '#F8FAFC');
        grad2.addColorStop(0.3, project.glowColor);
        grad2.addColorStop(1, '#07070C');
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fillStyle = grad2;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 1.5 * state.zoom;
        ctx.stroke();

        ctx.fillStyle = '#F8FAFC';
        ctx.font = `${14 * state.zoom}px Poppins, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(project.name, cx, cy - radius - 12 * state.zoom);

        if (isHovered) {
            ctx.fillStyle = '#7C3AED';
            ctx.font = `12px Poppins, sans-serif`;
            ctx.textBaseline = 'top';
            ctx.fillText('✦ EXPLORAR', cx, cy + radius + 6 * state.zoom);
        }

        const techAngleStep = (Math.PI * 2) / project.technologies.length;
        project.technologies.forEach((tech, index) => {
            const angle = state.time * 0.15 + index * techAngleStep;
            const orbitRadius = project.radius * techOrbitMultiplier * state.zoom;
            const sx = cx + Math.cos(angle) * orbitRadius;
            const sy = cy + Math.sin(angle) * orbitRadius;

            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(sx, sy);
            ctx.strokeStyle = 'rgba(34, 211, 238, 0.15)';
            ctx.lineWidth = 1 * state.zoom;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(sx, sy, 6 * state.zoom, 0, Math.PI * 2);
            ctx.fillStyle = '#22D3EE';
            ctx.shadowColor = '#22D3EE';
            ctx.shadowBlur = 12 * state.zoom;
            ctx.fill();
            ctx.shadowBlur = 0;
        });
    }

    function isProjectVisible(project) {
        return state.filter === 'all'
            || project.category === state.filter
            || project.technologies.some(t => t.toLowerCase() === state.filter);
    }

    function drawUniverse() {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();
        drawStars();
        drawParticles();

        Object.keys(projectsData).forEach(id => {
            if (isProjectVisible(projectsData[id])) drawOrbit(projectsData[id]);
        });

        Object.keys(projectsData).forEach(id => {
            const project = projectsData[id];
            const visible = isProjectVisible(project);
            ctx.globalAlpha = visible ? 1 : 0.25;
            drawPlanet(project, state.selectedProject === id, state.hoveredProject === id);
            ctx.globalAlpha = 1;
        });

        ctx.fillStyle = 'rgba(255,255,255,0.03)';
        ctx.font = '60px Poppins, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('EP — PROJECT UNIVERSE', canvas.width / 2, canvas.height / 2 - 150);
    }

    function animate() {
        state.time += 1 / 60;
        drawUniverse();
        state.animFrame = requestAnimationFrame(animate);
    }

    function resizeCanvas() {
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }

    // ============================================
    // COORDENADAS Y EVENTOS DEL CANVAS
    // ============================================
    function getCanvasCoords(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        return {
            x: (clientX - rect.left) * (canvas.width / rect.width),
            y: (clientY - rect.top) * (canvas.height / rect.height)
        };
    }

    function getUniverseCoords(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        const canvasX = (clientX - rect.left) * (canvas.width / rect.width);
        const canvasY = (clientY - rect.top) * (canvas.height / rect.height);
        const ux = (canvasX - canvas.width / 2) / state.zoom - state.offsetX;
        const uy = (canvasY - canvas.height / 2) / state.zoom - state.offsetY;
        return { ux, uy, canvasX, canvasY };
    }

    function handleMouseDown(e) {
        state.isDragging = true;
        const pos = getCanvasCoords(e);
        state.dragStartX = pos.x;
        state.dragStartY = pos.y;
        state.startOffsetX = state.offsetX;
        state.startOffsetY = state.offsetY;
        canvas.style.cursor = 'grabbing';
        e.preventDefault();
    }

    function handleMouseMove(e) {
        const pos = getUniverseCoords(e);
        let hovered = null;
        for (let id of Object.keys(projectsData)) {
            const p = projectsData[id];
            const dx = pos.ux - p.x;
            const dy = pos.uy - p.y;
            if (Math.sqrt(dx * dx + dy * dy) < p.radius * 1.2) {
                hovered = id;
                break;
            }
        }
        state.hoveredProject = hovered;

        if (hovered) {
            cursorEl.classList.add('hover-planet');
        } else {
            cursorEl.classList.remove('hover-planet');
        }

        if (state.isDragging) {
            const dx = pos.canvasX - state.dragStartX;
            const dy = pos.canvasY - state.dragStartY;
            state.offsetX = state.startOffsetX + dx / state.zoom;
            state.offsetY = state.startOffsetY + dy / state.zoom;
        }

        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        if (clientX !== undefined) {
            cursorEl.style.left = clientX + 'px';
            cursorEl.style.top = clientY + 'px';
        }
    }

    function handleMouseUp() {
        state.isDragging = false;
        canvas.style.cursor = 'grab';
    }

    function handleClick(e) {
        if (state.isDragging) return;
        const pos = getUniverseCoords(e);
        let clicked = null;
        for (let id of Object.keys(projectsData)) {
            const p = projectsData[id];
            const dx = pos.ux - p.x;
            const dy = pos.uy - p.y;
            if (Math.sqrt(dx * dx + dy * dy) < p.radius * 1.5) {
                clicked = id;
                break;
            }
        }
        clicked ? selectProject(clicked) : closePanel();
    }

    function handleWheel(e) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        state.zoom = Math.min(Math.max(state.zoom + delta, 0.5), 2.5);
    }

    // ============================================
    // PANEL DE PROYECTO
    // ============================================
    function selectProject(id) {
        state.selectedProject = id;
        openPanel(projectsData[id]);
    }

    function openPanel(project) {
        document.getElementById('panel-title').textContent = project.name;
        document.getElementById('panel-subtitle').textContent = project.subtitle;
        document.getElementById('panel-status').textContent = project.status;
        document.getElementById('panel-year').textContent = project.year;
        document.getElementById('panel-description').textContent = project.description;

        const techContainer = document.getElementById('panel-techs');
        techContainer.innerHTML = '';
        project.technologies.forEach(tech => {
            const span = document.createElement('span');
            span.className = 'tech-tag';
            span.textContent = tech;
            techContainer.appendChild(span);
        });

        document.getElementById('panel-link').href = project.link;
        document.getElementById('panel-repo').href = project.repo;

        const gallery = document.getElementById('panel-gallery');
        gallery.innerHTML = '';
        project.gallery.forEach(item => {
            const div = document.createElement('div');
            div.className = 'gallery-thumb';
            div.textContent = item;
            gallery.appendChild(div);
        });

        panel.classList.add('open');
    }

    function closePanel() {
        panel.classList.remove('open');
        state.selectedProject = null;
    }

    function applyFilter(filter) {
        state.filter = filter;
        filterUniverseBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
    }

    function centerUniverse() {
        state.offsetX = 0;
        state.offsetY = 0;
        state.zoom = 1;
        closePanel();
    }

    // ============================================
    // CONTROL DEL UNIVERSO
    // ============================================
    let listenersAttached = false;

    function startUniverse() {
        void container.offsetWidth; // forzar reflow antes de medir
        resizeCanvas();
        centerUniverse();
        cursorEl.style.display = 'block';

        if (state.animFrame) cancelAnimationFrame(state.animFrame);
        animate();

        if (!listenersAttached) {
            canvas.addEventListener('mousedown', handleMouseDown);
            canvas.addEventListener('mousemove', handleMouseMove);
            canvas.addEventListener('mouseup', handleMouseUp);
            canvas.addEventListener('click', handleClick);
            canvas.addEventListener('wheel', handleWheel, { passive: false });
            canvas.addEventListener('touchstart', handleMouseDown, { passive: false });
            canvas.addEventListener('touchmove', handleMouseMove, { passive: false });
            canvas.addEventListener('touchend', handleMouseUp);
            window.addEventListener('resize', resizeCanvas);

            filterUniverseBtns.forEach(btn => {
                btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
            });
            centerBtn.addEventListener('click', centerUniverse);
            closePanelBtn.addEventListener('click', closePanel);

            listenersAttached = true;
        }

        applyFilter('all');
    }

    function stopUniverse() {
        if (state.animFrame) {
            cancelAnimationFrame(state.animFrame);
            state.animFrame = null;
        }
        cursorEl.style.display = 'none';
        panel.classList.remove('open');
    }

    function exitUniverse() {
        if (body.classList.contains('game-mode')) {
            body.classList.remove('game-mode');
            gameIcon.textContent = '🎮';
            gameText.textContent = 'Modo Juego';
            stopUniverse();
        }
    }

    if (exitUniverseBtn) {
        exitUniverseBtn.addEventListener('click', exitUniverse);
    }

    // ============================================
    // BOTÓN PRINCIPAL DE TOGGLE
    // ============================================
    gameToggle.addEventListener('click', () => {
        const isOpening = !body.classList.contains('game-mode');

        if (isOpening) {
            body.classList.add('game-mode');
            gameIcon.textContent = '✦';
            gameText.textContent = 'Modo Universo';

            if (body.classList.contains('dark-mode')) {
                body.classList.remove('dark-mode');
                darkmodeIcon.classList.remove('fa-sun');
                darkmodeIcon.classList.add('fa-moon');
            }

            startUniverse();
        } else {
            body.classList.remove('game-mode');
            gameIcon.textContent = '🎮';
            gameText.textContent = 'Modo Juego';
            stopUniverse();
        }
    });

    // ✅ Si venimos del nav con #juego, activar Modo Universo automáticamente
    if (window.location.hash === '#juego') {
        // Limpiar el hash de la URL para no re-disparar al refrescar
        history.replaceState(null, '', window.location.pathname + window.location.search);
        // Pequeño delay para asegurar que todo esté montado
        setTimeout(() => gameToggle.click(), 250);
    }

});