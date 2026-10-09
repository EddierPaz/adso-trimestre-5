const API_KEY = "TU_API_KEY"
const BASE = "https://api.openweathermap.org/data/2.5"

const iconos = {
    "01": "☀️", "02": "🌤️", "03": "☁️", "04": "☁️",
    "09": "🌧️", "10": "🌦️", "11": "⛈️", "13": "❄️", "50": "🌫️"
}

async function buscar() {
    const ciudad = document.getElementById("ciudad").value.trim()
    if (!ciudad) return

    try {
        mostrarError("")
        const [actual, pronostico] = await Promise.all([
            fetch(`${BASE}/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`).then(r => r.json()),
            fetch(`${BASE}/forecast?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`).then(r => r.json())
        ])

        if (actual.cod !== 200) {
            mostrarError("Ciudad no encontrada")
            return
        }

        renderActual(actual)
        renderPronostico(pronostico)

    } catch {
        mostrarError("Error de conexión")
    }
}

function renderActual(d) {
    document.getElementById("nombre-ciudad").textContent = `${d.name}, ${d.sys.country}`
    document.getElementById("fecha").textContent = new Date().toLocaleDateString("es", { weekday: "long", day: "numeric", month: "long" })
    document.getElementById("temperatura").textContent = `${Math.round(d.main.temp)}°C`
    document.getElementById("descripcion").textContent = d.weather[0].description
    document.getElementById("sensacion").textContent = `${Math.round(d.main.feels_like)}°C`
    document.getElementById("humedad").textContent = `${d.main.humidity}%`
    document.getElementById("viento").textContent = `${Math.round(d.wind.speed * 3.6)} km/h`
    document.getElementById("visibilidad").textContent = `${(d.visibility / 1000).toFixed(1)} km`

    const codigo = d.weather[0].icon.slice(0, 2)
    document.getElementById("icono").textContent = iconos[codigo] || "🌡️"

    document.getElementById("clima-actual").classList.remove("oculto")
}

function renderPronostico(data) {
    const porDia = {}
    data.list.forEach(item => {
        const dia = item.dt_txt.split(" ")[0]
        if (!porDia[dia]) porDia[dia] = []
        porDia[dia].push(item)
    })

    const dias = Object.entries(porDia).slice(0, 5)
    const labels = []
    const maxTemps = []
    const minTemps = []

    document.getElementById("dias").innerHTML = dias.map(([fecha, items]) => {
        const max = Math.round(Math.max(...items.map(i => i.main.temp_max)))
        const min = Math.round(Math.min(...items.map(i => i.main.temp_min)))
        const icono = iconos[items[0].weather[0].icon.slice(0, 2)] || "🌡️"
        const nombre = new Date(fecha).toLocaleDateString("es", { weekday: "short", day: "numeric" })

        labels.push(nombre)
        maxTemps.push(max)
        minTemps.push(min)

        return `
      <div class="dia-card">
        <span class="dia-nombre">${nombre}</span>
        <span class="dia-icono">${icono}</span>
        <span class="dia-max">${max}°</span>
        <span class="dia-min">${min}°</span>
      </div>
    `
    }).join("")

    document.getElementById("pronostico").classList.remove("oculto")
    renderGrafica(labels, maxTemps, minTemps)
}

let grafica = null
function renderGrafica(labels, maxs, mins) {
    const canvas = document.getElementById("grafica")
    if (grafica) grafica.destroy()
    grafica = new Chart(canvas, {
        type: "line",
        data: {
            labels,
            datasets: [
                { label: "Máx °C", data: maxs, borderColor: "#e94560", backgroundColor: "rgba(233,69,96,0.1)", tension: 0.4, fill: true },
                { label: "Mín °C", data: mins, borderColor: "#378ADD", backgroundColor: "rgba(55,138,221,0.1)", tension: 0.4, fill: true }
            ]
        },
        options: {
            responsive: true,
            plugins: { legend: { labels: { color: "#fff" } } },
            scales: {
                x: { ticks: { color: "#888" }, grid: { color: "#1a1a2e" } },
                y: { ticks: { color: "#888" }, grid: { color: "#0f3460" } }
            }
        }
    })
}

function mostrarError(msg) {
    const el = document.getElementById("error")
    el.textContent = msg
    el.classList.toggle("oculto", !msg)
    if (msg) {
        document.getElementById("clima-actual").classList.add("oculto")
        document.getElementById("pronostico").classList.add("oculto")
    }
}

document.getElementById("ciudad").addEventListener("keydown", e => {
    if (e.key === "Enter") buscar()
})