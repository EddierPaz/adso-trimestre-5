from models.tarea import Tarea

class TareaService:

    def __init__(self, db):
        self.db = db

    def crear(self, tarea):
        cursor = self.db.get_cursor()

        cursor.execute(
            "INSERT INTO tareas (titulo, descripcion, categoria_id, usuario_id) VALUES (%s, %s, %s, %s)",
            (tarea.titulo, tarea.descripcion, tarea.categoria_id, tarea.usuario_id)
        )
        self.db.commit()

    def listar(self):
        cursor = self.db.get_cursor()
        cursor.execute("""
            SELECT t.id, t.titulo, t.descripcion, c.nombre, u.nombre
            FROM tareas t
            INNER JOIN usuarios u ON t.usuario_id = u.id
            INNER JOIN categorias c ON t.categoria_id = c.id
        """)
        return cursor.fetchall()

    def actualizar(self, tarea):
        cursor = self.db.get_cursor()
        cursor.execute(
            "UPDATE tareas SET titulo=%s, descripcion=%s, categoria_id=%s, usuario_id=%s WHERE id=%s",
            (tarea.titulo, tarea.descripcion, tarea.categoria_id, tarea.usuario_id, tarea.id)
        )
        self.db.commit()

    def eliminar(self, id):
        cursor = self.db.get_cursor()

        cursor.execute(
            "DELETE FROM tareas WHERE id=%s",
            (id,)
        )
        self.db.commit()