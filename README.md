# 📚 Aprendizaje Web & Backend — Eddier Paz

Repositorio de prácticas y ejercicios de desarrollo web frontend y backend con Python.  
Cubre desde maquetación con HTML/CSS hasta conexión a bases de datos con MySQL.

**Portafolio del Trimestre 5 **

---

## 🗂️ Estructura del repositorio

```
📦 repositorio/
│
├── 📁 frontend/
│   ├── bootstrap/            # Componentes y grillas con Bootstrap
│   │   └── bootstrap-completo/   # Ejercicios completos de Bootstrap
│   ├── flexbox/              # Layouts con Flexbox
│   └── proyectos/
│       ├── exposicion/       # Material de exposición
│       ├── laika/            # Proyecto sitio web Laika
│       └── laika-bootstrap/  # Versión de Laika con Bootstrap
│
├── 📁 backend/
│   ├── crud-mysql/           # CRUD básico con Python y MySQL
│   ├── crud-mysql-ejemplo2/  # Segunda variación del CRUD
│   └── crud-mysql-operpan/   # CRUD aplicado a operaciones/pan
│
├── 📄 index.html             # Página de inicio (opcional)
└── 📄 README.md
```

---

## 🖥️ Frontend

Ejercicios de maquetación y diseño web usando HTML, CSS y Bootstrap.

### Temas cubiertos

- Estructura semántica con HTML5
- Diseño responsive con **Flexbox**
- Sistema de grillas y componentes con **Bootstrap**
- Proyecto práctico: sitio web de **Laika**

### Cómo ver los proyectos

Abre el archivo `index.html` de cada carpeta directamente en el navegador, o usa la extensión **Live Server** en VS Code.

---

## 🐍 Backend

Prácticas de Python con conexión a MySQL, aplicando Programación Orientada a Objetos (POO).

### Temas cubiertos

- POO en Python (clases, herencia, encapsulamiento)
- Conexión a MySQL con `mysql-connector-python`
- Operaciones CRUD (Crear, Leer, Actualizar, Eliminar)
- Organización por capas: `config/`, `models/`, `services/`

### Requisitos

- Python 3.x
- MySQL Server
- MySQL Workbench (opcional)

```bash
pip install mysql-connector-python
```

### Configuración de la base de datos

Antes de ejecutar cualquier proyecto de backend, crea la base de datos en MySQL:

```sql
CREATE DATABASE ejemplo_db;
USE ejemplo_db;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100)
);
```

Luego ajusta las credenciales en `config/db.py`:

```python
self.connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="tu_contraseña",
    database="ejemplo_db"
)
```

### Cómo ejecutar

```bash
cd backend/crud-mysql
python main.py
```

---

## 🛠️ Tecnologías

| Área | Tecnologías |
|------|-------------|
| Frontend | HTML5, CSS3, Flexbox, Bootstrap |
| Backend | Python 3, MySQL |
| Herramientas | VS Code, MySQL Workbench, Git |

---

## 👤 Autor

**Eddier Paz**  
Repositorio de aprendizaje personal — prácticas y ejercicios de desarrollo web.