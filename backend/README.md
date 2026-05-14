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

# CRUD MYSQL con Python

## Descripción
Este proyecto es un CRUD básico desarrollado en Python utilizando MySQL como base de datos.  
Se implementaron las operaciones:

- Crear
- Listar
- Actualizar
- Eliminar

Además, se trabajó con:
- Clases
- Conexión a base de datos
- Programación orientada a objetos
- Separación por carpetas (`config`, `models`, `services`)

---

# Estructura del Proyecto

```text
CRUD_MYSQL/
│
├── config/
│   └── db.py
│
├── models/
│   └── usuario.py
│
├── services/
│   └── usuario_service.py
│
└── main.py
```

---

## Instalación

>Instalar MySQL Connector

* pip install mysql-connector-python

## Base de Datos

Crear Base de Datos
```py
CREATE DATABASE ejemplo_db;
```
Usar Base de Datos
```py
USE ejemplo_db;
```
Crear Tabla
```py 
CREATE TABLE usuarios(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100)
);
```
## Configuración de la Base de Datos
Config
* config/db.py
```py
import mysql.connector

class Database:
    def __init__(self):
        self.connection = None
    
    def connect(self):
        self.connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="ejemplo_db"
        )

        print("Conectado")
    
    def get_cursor(self):
        return self.connection.cursor()
    
    def commit(self):
        self.connection.commit()

    def close(self):
        self.connection.close()

```
Modelo
*models/usuario.py
```py
class Usuario:
    def __init__(self, nombre, email, id=None):
        self.id = id
        self.nombre = nombre
        self.email = email

    def __str__(self):
        return f"{self.id} - {self.nombre} - {self.email}"
```

Servicio CRUD
* services/usuario_service.py
```py
from models.usuario import Usuario

class UsuarioService:
    def __init__(self, db):
        self.db = db

    def crear(self, usuario):
        cursor = self.db.get_cursor()

        cursor.execute(
            "INSERT INTO usuarios(nombre, email) VALUES (%s, %s)",
            (usuario.nombre, usuario.email)
        )

        self.db.commit()

    def listar(self):
        cursor = self.db.get_cursor()

        cursor.execute("SELECT * FROM usuarios")

        datos = cursor.fetchall()

        usuarios = []

        for d in datos:
            usuarios.append(Usuario(d[1], d[2], d[0]))

        return usuarios
    
    def actualizar(self, usuario):
        cursor = self.db.get_cursor()

        cursor.execute(
            "UPDATE usuarios SET nombre=%s, email=%s WHERE id=%s",
            (usuario.nombre, usuario.email, usuario.id)
        )

        self.db.commit()

    def eliminar(self, id):
        cursor = self.db.get_cursor()

        cursor.execute(
            "DELETE FROM usuarios WHERE id=%s",
            (id,)
        )

        self.db.commit()
```
Programa Principal
* main.py
```py
from config.db import Database
from services.usuario_service import UsuarioService
from models.usuario import Usuario

def main():
    db = Database()
    db.connect()

    service = UsuarioService(db)

    while True:
        print("\n1. Crear")
        print("2. Listar")
        print("3. Actualizar")
        print("4. Eliminar")
        print("5. Salir")

        op = input("Opcion: ")

        if op == "1":
            nombre = input("Nombre: ")
            email = input("Email: ")

            service.crear(Usuario(nombre, email))
        
        elif op == "2":
            usuarios = service.listar()

            if not usuarios:
                print("No hay usuarios registrados.")
            else:
                for u in usuarios:
                    print(u)
        
        elif op == "3":
            id = int(input("ID: "))
            nombre = input("Nuevo nombre: ")
            email = input("Nuevo email: ")

            service.actualizar(Usuario(nombre, email, id))
        
        elif op == "4":
            id = int(input("ID: "))

            service.eliminar(id)
        
        elif op == "5":
            db.close()
            break

if __name__ == "__main__":
    main()
```
Ejecución del Proyecto
> python main.py

---

### Tecnologías Utilizadas
- Python
- MySQL
- MySQL Workbench
- mysql-connector-python
### Conceptos Aprendidos
- CRUD en Python
- Conexión a MySQL
- Programación Orientada a Objetos
- Clases y Objetos
- Servicios
- Modelos
- Uso de cursores
- SQL básico
- Organización de proyectos en carpetas

---