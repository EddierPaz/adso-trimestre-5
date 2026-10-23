/* ============================================
   APP TAREAS — Lógica
   ============================================ */

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
let filtroActual = "todas";

// Referencias
const input = document.getElementById("input-tarea");
const lista = document.getElementById("lista-tareas");
const totalEl = document.getElementById("total");
const completadasEl = document.getElementById("completadas");

// ============================================
// PERSISTENCIA
// ============================================
function guardar() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

// ============================================
// ACCIONES
// ============================================
function agregarTarea() {
    const categoria = document.getElementById("categoria").value;
    const texto = input.value.trim();

    if (!texto) {
        input.focus();
        return;
    }

    tareas.push({
        id: Date.now(),
        texto,
        categoria,
        estado: "pendiente"
    });

    input.value = "";
    input.focus();
    guardar();
    renderizar();
}

function eliminar(id) {
    tareas = tareas.filter(t => t.id !== id);
    guardar();
    renderizar();
}

function toggleEstado(id) {
    const tarea = tareas.find(t => t.id === id);
    if (!tarea) return;
    tarea.estado = tarea.estado === "pendiente" ? "completada" : "pendiente";
    guardar();
    renderizar();
}

function filtrar(estado, btn) {
    filtroActual = estado;

    document.querySelectorAll(".filtros button")
        .forEach(b => b.classList.remove("activo"));
    btn.classList.add("activo");

    renderizar();
}

// ============================================
// RENDERIZADO
// ============================================
function renderizar() {
    const visibles = filtroActual === "todas"
        ? tareas
        : tareas.filter(t => t.estado === filtroActual);

    lista.innerHTML = visibles.map(t => `
        <li class="tarea ${t.estado}">
            <div class="tarea-info">
                <span class="categoria ${t.categoria}">${t.categoria}</span>
                <span class="texto">${escapeHTML(t.texto)}</span>
            </div>
            <div class="acciones">
                <button onclick="toggleEstado(${t.id})" 
                        title="${t.estado === 'pendiente' ? 'Marcar como completada' : 'Marcar como pendiente'}">
                    ${t.estado === "pendiente" ? "✓" : "↩"}
                </button>
                <button onclick="eliminar(${t.id})" 
                        class="btn-eliminar" 
                        title="Eliminar tarea">
                    ✕
                </button>
            </div>
        </li>
    `).join("");

    totalEl.textContent = `${tareas.length} ${tareas.length === 1 ? 'tarea' : 'tareas'}`;
    const completadas = tareas.filter(t => t.estado === "completada").length;
    completadasEl.textContent = `${completadas} completada${completadas === 1 ? '' : 's'}`;
}

// ============================================
// SEGURIDAD: escapa HTML para evitar XSS
// ============================================
function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ============================================
// EVENTOS
// ============================================
input.addEventListener("keydown", e => {
    if (e.key === "Enter") agregarTarea();
});

// ============================================
// INIT
// ============================================
renderizar();