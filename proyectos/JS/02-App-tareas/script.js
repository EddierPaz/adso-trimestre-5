let tareas = JSON.parse(localStorage.getItem("tareas")) || []
let filtroActual = "todas"

function guardar() {
    localStorage.setItem("tareas", JSON.stringify(tareas))
}

function agregarTarea() {
    const input = document.getElementById("input-tarea")
    const categoria = document.getElementById("categoria").value
    const texto = input.value.trim()

    if (!texto) return

    tareas.push({
        id: Date.now(),
        texto,
        categoria,
        estado: "pendiente"
    })

    input.value = ""
    guardar()
    renderizar()
}

function eliminar(id) {
    tareas = tareas.filter(t => t.id !== id)
    guardar()
    renderizar()
}

function toggleEstado(id) {
    const tarea = tareas.find(t => t.id === id)
    tarea.estado = tarea.estado === "pendiente" ? "completada" : "pendiente"
    guardar()
    renderizar()
}

function filtrar(estado) {
    filtroActual = estado
    document.querySelectorAll(".filtros button").forEach(b => b.classList.remove("activo"))
    event.target.classList.add("activo")
    renderizar()
}

function renderizar() {
    const lista = document.getElementById("lista-tareas")
    const visibles = filtroActual === "todas"
        ? tareas
        : tareas.filter(t => t.estado === filtroActual)

    lista.innerHTML = visibles.map(t => `
    <li class="tarea ${t.estado}">
      <div class="tarea-info">
        <span class="categoria ${t.categoria}">${t.categoria}</span>
        <span class="texto">${t.texto}</span>
      </div>
      <div class="acciones">
        <button onclick="toggleEstado(${t.id})">${t.estado === "pendiente" ? "✓" : "↩"}</button>
        <button onclick="eliminar(${t.id})" class="btn-eliminar">✕</button>
      </div>
    </li>
  `).join("")

    document.getElementById("total").textContent = `${tareas.length} tareas`
    document.getElementById("completadas").textContent = `${tareas.filter(t => t.estado === "completada").length} completadas`
}

input.addEventListener("keydown", e => {
    if (e.key === "Enter") agregarTarea()
})

const input = document.getElementById("input-tarea")

renderizar()