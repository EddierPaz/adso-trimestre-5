let expresion = ""

const pantalla = document.getElementById("pantalla")

function agregar(valor) {
  expresion += valor
  pantalla.textContent = expresion
}

function calcular() {
  try {
    expresion = String(eval(expresion))
    pantalla.textContent = expresion
  } catch {
    pantalla.textContent = "Error"
    expresion = ""
  }
}

function limpiar() {
  expresion = ""
  pantalla.textContent = "0"
}

function borrar() {
  expresion = expresion.slice(0, -1)
  pantalla.textContent = expresion || "0"
}