from models.usuario import Tarea

class UsuarioService:
    def __init__(self, db):
        self.db = db

    def crear(self, tarea):
        cursor = self.db.get_cursor()
        cursor.execute(
            "INSERT INTO tipo_tarea (nombre_tipo_tarea) VALUES (%s)",
            (tarea.nombre_tipo_tarea,)
        )
        self.db.commit()

    def listar(self):
        cursor = self.db.get_cursor()
        cursor.execute("SELECT * FROM tipo_tarea")
        datos = cursor.fetchall()
        tareas = []
        for d in datos:
            tareas.append(Tarea(d[1], d[0]))
            
        return tareas

    def actualizar(self, tarea):
        cursor = self.db.get_cursor()
        cursor.execute(
            "UPDATE tipo_tarea SET nombre_tipo_tarea = %s WHERE id_tipo_tarea = %s",
            (tarea.nombre_tipo_tarea, tarea.id_tipo_tarea)
        )
        self.db.commit()

    def eliminar(self, id_tipo_tarea):
        cursor = self.db.get_cursor()
        cursor.execute("DELETE FROM tipo_tarea WHERE id_tipo_tarea=%s", (id_tipo_tarea,))
        self.db.commit()
