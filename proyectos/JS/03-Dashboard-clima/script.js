/* ============================================
   DASHBOARD CLIMA — Lógica
   ============================================ */

const API_KEY = "4e0dfc83a9341a30a742cdf6cc74c017";
const BASE = "https://api.openweathermap.org/data/2.5";

const iconos = {
    "01": "☀️", "02": "🌤️", "03": "☁️", "04": "☁️",
    "09": "🌧️", "10": "🌦️", "11": "⛈️", "13": "❄️", "50": "🌫️"
};

let grafica = null;

// ============================================
// BÚSQUEDA
// ============================================
async function buscar() {
    const ciudad = document.getElementById("ciudad").value.trim();
    if (!ciudad) return;

    try {
        mostrarError("");

        const [actual, pronostico] = await Promise.all([
            fetch(`${BASE}/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`).then(r => r.json()),
            fetch(`${BASE}/forecast?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`).then(r => r.json())
        ]);

        if (actual.cod !== 200) {
            mostrarError("Ciudad no encontrada. Intenta con otro nombre.");
            return;
        }

        renderActual(actual);
        renderPronostico(pronostico);

    } catch (err) {
        console.error(err);
        mostrarError("Error de conexión. Verifica tu internet.");
    }
}

// ============================================
// CLIMA ACTUAL
// ============================================
function renderActual(d) {
    document.getElementById("nombre-ciudad").textContent = `${d.name}, ${d.sys.country}`;
    document.getElementById("fecha").textContent = new Date().toLocaleDateString("es", {
        weekday: "long", day: "numeric", month: "long"
    });
    document.getElementById("temperatura").textContent = `${Math.round(d.main.temp)}°C`;
    document.getElementById("descripcion").textContent = d.weather[0].description;
    document.getElementById("sensacion").textContent = `${Math.round(d.main.feels_like)}°C`;
    document.getElementById("humedad").textContent = `${d.main.humidity}%`;
    document.getElementById("viento").textContent = `${Math.round(d.wind.speed * 3.6)} km/h`;
    document.getElementById("visibilidad").textContent = `${(d.visibility / 1000).toFixed(1)} km`;

    const codigo = d.weather[0].icon.slice(0, 2);
    document.getElementById("icono").textContent = iconos[codigo] || "🌡️";

    document.getElementById("clima-actual").classList.remove("oculto");
}

// ============================================
// PRONÓSTICO
// ============================================
function renderPronostico(data) {
    const porDia = {};
    data.list.forEach(item => {
        const dia = item.dt_txt.split(" ")[0];
        if (!porDia[dia]) porDia[dia] = [];
        porDia[dia].push(item);
    });

    const dias = Object.entries(porDia).slice(0, 5);
    const labels = [];
    const maxTemps = [];
    const minTemps = [];

    document.getElementById("dias").innerHTML = dias.map(([fecha, items]) => {
        const max = Math.round(Math.max(...items.map(i => i.main.temp_max)));
        const min = Math.round(Math.min(...items.map(i => i.main.temp_min)));
        const icono = iconos[items[0].weather[0].icon.slice(0, 2)] || "🌡️";
        const nombre = new Date(fecha).toLocaleDateString("es", {
            weekday: "short", day: "numeric"
        });

        labels.push(nombre);
        maxTemps.push(max);
        minTemps.push(min);

        return `
            <div class="dia-card">
                <span class="dia-nombre">${nombre}</span>
                <span class="dia-icono">${icono}</span>
                <span class="dia-max">${max}°</span>
                <span class="dia-min">${min}°</span>
            </div>
        `;
    }).join("");

    document.getElementById("pronostico").classList.remove("oculto");
    renderGrafica(labels, maxTemps, minTemps);
}

// ============================================
// GRÁFICA (Chart.js) — colores dinámicos según tema
// ============================================
function renderGrafica(labels, maxs, mins) {
    const canvas = document.getElementById("grafica");
    if (grafica) grafica.destroy();

    // Detectar tema actual para adaptar colores
    const isDark = document.body.classList.contains("dark-mode");
    const gridColor = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
    const textColor = isDark ? "#94A3B8" : "#6B7280";
    const legendColor = isDark ? "#F8FAFC" : "#1E1E2F";

    grafica = new Chart(canvas, {
        type: "line",
        data: {
            labels,
            datasets: [
                {
                    label: "Máx °C",
                    data: maxs,
                    borderColor: "#7C3AED",
                    backgroundColor: "rgba(124, 58, 237, 0.15)",
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: "#7C3AED",
                    pointBorderColor: "#FFFFFF",
                    pointBorderWidth: 2,
                    pointRadius: 5
                },
                {
                    label: "Mín °C",
                    data: mins,
                    borderColor: "#06B6D4",
                    backgroundColor: "rgba(6, 182, 212, 0.15)",
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: "#06B6D4",
                    pointBorderColor: "#FFFFFF",
                    pointBorderWidth: 2,
                    pointRadius: 5
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    labels: { color: legendColor, font: { family: 'Poppins', size: 12 } }
                }
            },
            scales: {
                x: {
                    ticks: { color: textColor, font: { family: 'Poppins', size: 11 } },
                    grid: { color: gridColor }
                },
                y: {
                    ticks: { color: textColor, font: { family: 'Poppins', size: 11 } },
                    grid: { color: gridColor }
                }
            }
        }
    });
}

// ============================================
// ERROR
// ============================================
function mostrarError(msg) {
    const el = document.getElementById("error");
    el.textContent = msg;
    el.classList.toggle("oculto", !msg);

    if (msg) {
        document.getElementById("clima-actual").classList.add("oculto");
        document.getElementById("pronostico").classList.add("oculto");
    }
}

// ============================================
// EVENTOS
// ============================================
document.getElementById("ciudad").addEventListener("keydown", e => {
    if (e.key === "Enter") buscar();
});

// ============================================
// AL CAMBIAR DE TEMA → REDIBUJAR GRÁFICA
// ============================================
// Observa cambios en la clase del body para redibujar la gráfica con los
// colores correctos del tema nuevo
const observer = new MutationObserver(() => {
    if (grafica) {
        // Guarda los datos actuales
        const labels = grafica.data.labels;
        const maxs = grafica.data.datasets[0].data;
        const mins = grafica.data.datasets[1].data;

        // Redibuja con los colores nuevos
        renderGrafica(labels, maxs, mins);
    }
});

observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });