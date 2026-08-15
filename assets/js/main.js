document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // PARTE 1: MODO LECTURA (funcionalidad existente)
    // ============================================

    const body = document.body;
    const darkmodeBtn = document.getElementById('darkmode-toggle');
    const darkmodeIcon = darkmodeBtn.querySelector('i');

    // Tema oscuro/claro
    darkmodeBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            darkmodeIcon.classList.remove('fa-moon');
            darkmodeIcon.classList.add('fa-sun');
        } else {
            darkmodeIcon.classList.remove('fa-sun');
            darkmodeIcon.classList.add('fa-moon');
        }
    });

    // Navegación activa por scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Filtros de proyectos (modo lectura)
    const filterBtns = document.querySelectorAll('.btn-filter');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // ============================================
    // PARTE 2: MODO UNIVERSO (nueva funcionalidad)
    // ============================================

    // --- Referencias a elementos del universo ---
    const container = document.getElementById('universe-container');
    const canvas = document.getElementById('universe-canvas');
    const ctx = canvas.getContext('2d');
    const centerBtn = document.getElementById('center-universe-btn');
    const panel = document.getElementById('project-panel');
    const closePanelBtn = document.getElementById('close-panel-btn');
    const filterUniverseBtns = document.querySelectorAll('.universe-filter');

    // NUEVO: Botón para salir del universo (Modo Lectura)
    const exitUniverseBtn = document.getElementById('exit-universe-btn');

    // --- Cursor personalizado ---
    const cursorEl = document.createElement('div');
    cursorEl.className = 'universe-cursor';
    document.body.appendChild(cursorEl);

    // --- Datos de proyectos y tecnologías ---
    const projectsData = {
        'operpan': {
            id: 'operpan',
            name: 'OperPan',
            subtitle: 'Sistema de Gestión de Personal',
            status: 'Destacado',
            year: '2026',
            description: 'Sistema web desarrollado para optimizar procesos administrativos de personal. Incluye módulos de empleados, horarios, permisos y reportes.',
            technologies: ['Django', 'Python', 'MySQL', 'JavaScript', 'Bootstrap', 'HTML', 'CSS'],
            category: 'sistemas',
            link: '#',
            repo: '#',
            gallery: ['Dashboard', 'Empleados', 'Horarios', 'Permisos', 'Reportes'],
            x: 0,
            y: 0,
            radius: 65,
            glowColor: '#7C3AED'
        },
        'crud-mysql': {
            id: 'crud-mysql',
            name: 'CRUD MySQL',
            subtitle: 'Backend / Base de datos',
            status: 'Completado',
            year: '2025',
            description: 'Implementación de CRUD con Python y MySQL, siguiendo una arquitectura por capas.',
            technologies: ['Python', 'MySQL'],
            category: 'backend',
            link: '#',
            repo: '#',
            gallery: ['Estructura', 'Conexión', 'Operaciones'],
            x: 0,
            y: 0,
            radius: 45,
            glowColor: '#38BDF8'
        },
        'laika': {
            id: 'laika',
            name: 'Laika',
            subtitle: 'Sitio web de tienda de mascotas',
            status: 'Frontend',
            year: '2025',
            description: 'Proyecto práctico de frontend: tienda de mascotas con diseño responsivo y CSS puro.',
            technologies: ['HTML', 'CSS'],
            category: 'web',
            link: '#',
            repo: '#',
            gallery: ['Home', 'Productos', 'Contacto'],
            x: 0,
            y: 0,
            radius: 35,
            glowColor: '#FFB050'
        },
        'portafolio': {
            id: 'portafolio',
            name: 'Portafolio Personal',
            subtitle: 'Frontend / Identidad digital',
            status: 'Activo',
            year: '2026',
            description: 'Mi portafolio personal que estás explorando ahora. Desarrollado con HTML, CSS y JavaScript puro.',
            technologies: ['HTML', 'CSS', 'JavaScript'],
            category: 'web',
            link: '#',
            repo: '#',
            gallery: ['Diseño', 'Modo Lectura', 'Modo Universo'],
            x: 0,
            y: 0,
            radius: 40,
            glowColor: '#22D3EE'
        }
    };

    // Lista de tecnologías únicas
    const allTechs = ['Django', 'Python', 'MySQL', 'JavaScript', 'Bootstrap', 'HTML', 'CSS'];

    // Mapa tecnología -> proyectos
    const techToProjects = {};
    allTechs.forEach(tech => {
        techToProjects[tech] = [];
        Object.values(projectsData).forEach(p => {
            if (p.technologies.includes(tech)) {
                techToProjects[tech].push(p.id);
            }
        });
    });

    // --- Estado del universo ---
    const state = {
        offsetX: 0,
        offsetY: 0,
        zoom: 1,
        isDragging: false,
        dragStartX: 0,
        dragStartY: 0,
        startOffsetX: 0,
        startOffsetY: 0,
        selectedProject: null,
        hoveredProject: null,
        filter: 'all',
        animFrame: null,
        particles: [],
        stars: [],
        time: 0
    };

    // --- Layout: distribución de planetas ---
    const layoutRadius = 280;
    const techOrbitMultiplier = 1.8;

    function layoutPlanets() {
        const ids = Object.keys(projectsData);
        const count = ids.length;
        const angleStep = (Math.PI * 2) / count;
        let startAngle = -Math.PI / 2;
        // Ordenar para que OperPan esté arriba
        const ordered = ['operpan', 'crud-mysql', 'laika', 'portafolio'];
        ordered.forEach((id, index) => {
            const angle = startAngle + index * angleStep;
            const p = projectsData[id];
            p.x = Math.cos(angle) * layoutRadius;
            p.y = Math.sin(angle) * layoutRadius;
        });
    }
    layoutPlanets();

    // --- Partículas y estrellas ---
    function initParticles() {
        const count = 120;
        state.particles = [];
        for (let i = 0; i < count; i++) {
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
    initParticles();

    function initStars() {
        const count = 300;
        state.stars = [];
        for (let i = 0; i < count; i++) {
            state.stars.push({
                x: (Math.random() - 0.5) * 3000,
                y: (Math.random() - 0.5) * 3000,
                radius: Math.random() * 1.2 + 0.3,
                opacity: 0.2 + Math.random() * 0.6
            });
        }
    }
    initStars();

    // --- Funciones de dibujo ---
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

        // Glow
        const glowSize = isSelected ? radius * 3 : (isHovered ? radius * 2.5 : radius * 1.8);
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowSize);
        grad.addColorStop(0, project.glowColor + '40');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Cuerpo del planeta
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

        // Nombre
        ctx.fillStyle = '#F8FAFC';
        ctx.font = `${14 * state.zoom}px Poppins, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(project.name, cx, cy - radius - 12 * state.zoom);

        // Etiqueta "EXPLORAR" en hover
        if (isHovered) {
            ctx.fillStyle = '#7C3AED';
            ctx.font = `12px Poppins, sans-serif`;
            ctx.textBaseline = 'top';
            ctx.fillText('✦ EXPLORAR', cx, cy + radius + 6 * state.zoom);
        }

        // Satélites (tecnologías)
        const techAngleStep = (Math.PI * 2) / project.technologies.length;
        project.technologies.forEach((tech, index) => {
            const angle = state.time * 0.15 + index * techAngleStep;
            const orbitRadius = project.radius * techOrbitMultiplier * state.zoom;
            const sx = cx + Math.cos(angle) * orbitRadius;
            const sy = cy + Math.sin(angle) * orbitRadius;
            // Línea de conexión
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(sx, sy);
            ctx.strokeStyle = 'rgba(34, 211, 238, 0.15)';
            ctx.lineWidth = 1 * state.zoom;
            ctx.stroke();
            // Satélite
            const techRadius = 6 * state.zoom;
            ctx.beginPath();
            ctx.arc(sx, sy, techRadius, 0, Math.PI * 2);
            ctx.fillStyle = '#22D3EE';
            ctx.shadowColor = '#22D3EE';
            ctx.shadowBlur = 12 * state.zoom;
            ctx.fill();
            ctx.shadowBlur = 0;
        });
    }

    function drawUniverse() {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();
        drawStars();
        drawParticles();

        const projectIds = Object.keys(projectsData);
        // Dibujar órbitas primero
        projectIds.forEach(id => {
            const project = projectsData[id];
            const isVisible = (state.filter === 'all' || project.category === state.filter || project.technologies.some(t => t.toLowerCase() === state.filter));
            if (isVisible) drawOrbit(project);
        });

        // Dibujar planetas
        projectIds.forEach(id => {
            const project = projectsData[id];
            const isVisible = (state.filter === 'all' || project.category === state.filter || project.technologies.some(t => t.toLowerCase() === state.filter));
            ctx.globalAlpha = isVisible ? 1 : 0.25;
            const isSelected = state.selectedProject === id;
            const isHovered = state.hoveredProject === id;
            drawPlanet(project, isSelected, isHovered);
            ctx.globalAlpha = 1;
        });

        // Título sutil
        ctx.fillStyle = 'rgba(255,255,255,0.03)';
        ctx.font = '60px Poppins, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('EP — PROJECT UNIVERSE', canvas.width / 2, canvas.height / 2 - 150);
    }

    // --- Animación ---
    function animate() {
        state.time += 1 / 60;
        drawUniverse();
        state.animFrame = requestAnimationFrame(animate);
    }

    // --- Redimensionar canvas ---
    function resizeCanvas() {
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }

    // --- Eventos del canvas ---
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
        // Detectar hover
        let hovered = null;
        for (let id of Object.keys(projectsData)) {
            const p = projectsData[id];
            const dx = pos.ux - p.x;
            const dy = pos.uy - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < p.radius * 1.2) {
                hovered = id;
                break;
            }
        }
        state.hoveredProject = hovered;

        // Cursor personalizado
        if (hovered) {
            cursorEl.classList.add('hover-planet');
            cursorEl.classList.remove('hover-tech');
        } else {
            cursorEl.classList.remove('hover-planet', 'hover-tech');
        }

        if (state.isDragging) {
            const dx = pos.canvasX - state.dragStartX;
            const dy = pos.canvasY - state.dragStartY;
            state.offsetX = state.startOffsetX + dx / state.zoom;
            state.offsetY = state.startOffsetY + dy / state.zoom;
        }

        // Posicionar cursor
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        if (clientX !== undefined) {
            cursorEl.style.left = clientX + 'px';
            cursorEl.style.top = clientY + 'px';
        }
    }

    function handleMouseUp(e) {
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
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < p.radius * 1.5) {
                clicked = id;
                break;
            }
        }
        if (clicked) {
            selectProject(clicked);
        } else {
            closePanel();
        }
    }

    function handleWheel(e) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        state.zoom = Math.min(Math.max(state.zoom + delta, 0.5), 2.5);
    }

    // --- Selección de proyecto ---
    function selectProject(id) {
        state.selectedProject = id;
        const project = projectsData[id];
        openPanel(project);
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

    // --- Filtros ---
    function applyFilter(filter) {
        state.filter = filter;
        filterUniverseBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
    }

    // --- Centrar universo ---
    function centerUniverse() {
        state.offsetX = 0;
        state.offsetY = 0;
        state.zoom = 1;
        closePanel();
        state.selectedProject = null;
    }

    // ============================================================
    // NUEVA FUNCIÓN: Salir del universo (volver al modo lectura)
    // ============================================================
    function exitUniverse() {
        // Si el modo juego está activo, lo desactivamos
        if (body.classList.contains('game-mode')) {
            body.classList.remove('game-mode');
            // Actualizar el botón del header
            gameIcon.textContent = '🎮';
            gameText.textContent = 'Modo Juego';
            // Detener animaciones y limpiar
            stopUniverse();
            // Restaurar scroll
            document.body.style.overflow = '';
            // El observer se encarga de ocultar el contenedor
        }
    }

    // --- Iniciar / detener universo ---
    function startUniverse() {
        resizeCanvas();
        centerUniverse();
        cursorEl.style.display = 'block';
        if (state.animFrame) cancelAnimationFrame(state.animFrame);
        animate();

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

        // NUEVO: evento para el botón "Modo Lectura" dentro del universo
        if (exitUniverseBtn) {
            exitUniverseBtn.addEventListener('click', exitUniverse);
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
        // Los listeners se mantienen, pero el contenedor se oculta, así que no hay interacción.
    }

    // --- Integración con el botón de Modo Juego ---
    // Reemplazar el botón existente para evitar duplicación de listeners
    const oldGameToggle = document.getElementById('game-toggle');
    const newGameToggle = oldGameToggle.cloneNode(true);
    oldGameToggle.parentNode.replaceChild(newGameToggle, oldGameToggle);
    const gameIcon = newGameToggle.querySelector('#game-icon');
    const gameText = newGameToggle.querySelector('#game-text');

    newGameToggle.addEventListener('click', () => {
        body.classList.toggle('game-mode');
        if (body.classList.contains('game-mode')) {
            gameIcon.textContent = '✦';
            gameText.textContent = 'Modo Universo';
            startUniverse();
            // Si estaba en modo oscuro, lo desactivamos (opcional)
            if (body.classList.contains('dark-mode')) {
                body.classList.remove('dark-mode');
                darkmodeIcon.classList.remove('fa-sun');
                darkmodeIcon.classList.add('fa-moon');
            }
        } else {
            gameIcon.textContent = '🎮';
            gameText.textContent = 'Modo Juego';
            stopUniverse();
            document.body.style.overflow = '';
        }
    });

    // Si la página se recarga con game-mode activo, iniciar universo
    if (body.classList.contains('game-mode')) {
        startUniverse();
        gameIcon.textContent = '✦';
        gameText.textContent = 'Modo Universo';
    }

    // Observar cambios en la clase game-mode para mostrar/ocultar el contenedor
    const observer = new MutationObserver(() => {
        if (body.classList.contains('game-mode')) {
            container.style.display = 'block';
            container.style.opacity = '1';
            resizeCanvas();
        } else {
            container.style.display = 'none';
        }
    });
    observer.observe(body, { attributes: true, attributeFilter: ['class'] });

    // Inicialización: si no está en modo juego, ocultar contenedor
    if (!body.classList.contains('game-mode')) {
        container.style.display = 'none';
    }
});