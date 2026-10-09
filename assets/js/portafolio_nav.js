/* ============================================
   NAV COMPARTIDO — Lógica (tema)
   Usa FontAwesome para el icono (fa-moon / fa-sun)
   ============================================ */
(function () {
    'use strict';

    const STORAGE_KEY = 'ep-theme';
    const body = document.body;
    const toggleBtn = document.getElementById('pnav-dark-toggle');

    // Busca el <i> dentro del botón (por si acaso el HTML cambia)
    const iconEl = toggleBtn ? toggleBtn.querySelector('i') : null;

    // Aplica el tema y actualiza el icono
    function applyTheme(theme) {
        const isDark = theme === 'dark';

        // Cambia la clase del body
        body.classList.toggle('dark-mode', isDark);

        // Cambia el icono
        if (iconEl) {
            iconEl.classList.remove('fa-moon', 'fa-sun');
            iconEl.classList.add(isDark ? 'fa-sun' : 'fa-moon');
        }

        // Actualiza aria-label
        if (toggleBtn) {
            toggleBtn.setAttribute(
                'aria-label',
                isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
            );
        }
    }

    // Determina el tema inicial: preferencia guardada → sistema
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') {
        applyTheme(saved);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
    }

    // Toggle al hacer click
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const isDark = !body.classList.contains('dark-mode');
            applyTheme(isDark ? 'dark' : 'light');
            localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
        });
    }
})();