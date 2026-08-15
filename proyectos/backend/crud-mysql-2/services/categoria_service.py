from models.categoria import Categoria

class CategoriaService:

    def __init__(self, db):
        self.db = db

    def crear(self, categoria):
        cursor = self.db.get_cursor()
        cursor.execute(
            "INSERT INTO categorias (nombre) VALUES (%s)",
            (categoria.nombre,)
        )
        self.db.commit()

    def listar(self):
        cursor = self.db.get_cursor()

        cursor.execute("""
            SELECT * FROM categorias
        """)
        return cursor.fetchall()

    def actualizar(self, categoria):
        cursor = self.db.get_cursor()
        cursor.execute(
            "UPDATE categorias SET nombre=%s WHERE id=%s",
            (categoria.nombre, categoria.id)
        )
        self.db.commit()

    def eliminar(self, id):
        cursor = self.db.get_cursor()
        cursor.execute(
            "DELETE FROM categorias WHERE id=%s",
            (id,)
        )
        self.db.commit()