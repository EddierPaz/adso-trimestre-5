document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SELECCIONAR ELEMENTOS ---
    const body = document.body;
    
    // Elementos del Modo Claro/Oscuro (Sol/Luna)
    const darkmodeBtn = document.getElementById('darkmode-toggle');
    const darkmodeIcon = darkmodeBtn.querySelector('i');

    // Elementos del Modo Juego
    const gameBtn = document.getElementById('game-toggle');
    const gameIcon = document.getElementById('game-icon');
    const gameText = document.getElementById('game-text');


    // --- 2. LÓGICA DEL MODO CLARO / OSCURO (SOL Y LUNA) ---
    darkmodeBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Cambiar el icono (Sol / Luna)
        if (body.classList.contains('dark-mode')) {
            darkmodeIcon.classList.remove('fa-moon');
            darkmodeIcon.classList.add('fa-sun');
        } else {
            darkmodeIcon.classList.remove('fa-sun');
            darkmodeIcon.classList.add('fa-moon');
        }
    });


    // --- 3. LÓGICA DEL MODO JUEGO ---
    gameBtn.addEventListener('click', () => {
        body.classList.toggle('game-mode');
        
        // Cambiar el texto del botón
        if (body.classList.contains('game-mode')) {
            gameIcon.textContent = '🎮';
            gameText.textContent = 'Modo Juego';
            // Si activamos el modo juego, quitamos el modo oscuro para que no choquen
            if (body.classList.contains('dark-mode')) {
                body.classList.remove('dark-mode');
                darkmodeIcon.classList.remove('fa-sun');
                darkmodeIcon.classList.add('fa-moon');
            }
        } else {
            gameIcon.textContent = '📖';
            gameText.textContent = 'Modo Lectura';
        }
    });


    // --- 4. NAVEGACIÓN ACTIVA POR SCROLL (Resalta el menú) ---
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

    // --- 5. FILTROS DE PROYECTOS ---
    const filterBtns = document.querySelectorAll('.btn-filter');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
});