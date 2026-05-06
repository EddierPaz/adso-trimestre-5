# Python POO - Eddier Paz

Este documento contiene un resumen completo de la **Programación Orientada a Objetos (POO)** en Python, cubriendo desde los conceptos básicos hasta los pilares fundamentales.

---

## 1. Conceptos Fundamentales

| Concepto | Definición |
| :--- | :--- |
| **Clase** | Molde o plantilla para crear objetos. Define atributos y métodos. |
| **Objeto** | Instancia concreta de una clase con datos reales. |
| **Atributo** | Variables que definen las características del objeto. |
| **Método** | Funciones que definen el comportamiento del objeto. |



---

## 2. El Método Constructor `__init__`

El constructor es un método especial que se ejecuta automáticamente al instanciar un objeto. Se usa para inicializar los atributos.

```python
class Persona:
    # Atributo de clase (compartido por todos)
    especie = "Humano"

    def __init__(self, nombre, edad):
        # Atributos de instancia (únicos para cada objeto)
        self.nombre = nombre
        self.edad = edad

# Crear un objeto (instanciar)
p1 = Persona("Eddier", 25)
print(p1.nombre) # Salida: Eddier
```

---

## 3. Los 4 Pilares de la POO

- Abstracción: Enfocarse en lo esencial del objeto, ocultando los detalles complejos del funcionamiento interno.
- Encapsulamiento: Proteger el estado interno del objeto. En Python se usa _ (protegido) o __ (privado) para limitar el acceso a los atributos.
- Herencia: Permite crear una clase nueva a partir de una existente para reutilizar código.
- Polimorfismo: Capacidad de diferentes clases de responder al mismo método de formas distintas.

--- 

```py
class Coche:
    def __init__(self, color, aceleracion):
        self.color = color
        self.aceleracion = aceleracion

    def describir(self):
        return f"Coche {self.color} con aceleración de {self.aceleracion} m/s²"


class CocheVolador(Coche):
    ruedas = 6

    def __init__(self, color, aceleracion, esta_volando=False):
        # super() conecta con el constructor del padre
        super().__init__(color, aceleracion)
        self.esta_volando = esta_volando

    def vuela(self):
        self.esta_volando = True
        return "¡El coche está volando!"

    def aterriza(self):
        self.esta_volando = False
        return "El coche ha aterrizado."


# Instanciación
mi_coche = CocheVolador("Azul", 20)
print(mi_coche.describir())
print(mi_coche.vuela())
```

## 4. Inspección de Clases (corregido)

Python ofrece herramientas para verificar relaciones entre objetos y clases:
```py
print(isinstance(mi_coche, Coche))  # True
```
>👉 isinstance(objeto, Clase)
- Verifica si un objeto pertenece a una clase o a una clase padre.

```py
print(issubclass(CocheVolador, Coche))  # True
```

>👉 issubclass(Subclase, ClasePadre)
- Verifica si una clase hereda de otra.
