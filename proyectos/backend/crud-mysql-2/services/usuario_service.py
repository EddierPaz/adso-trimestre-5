from models.usuario import Usuario

class UsuarioService:
    def __init__(self,db):
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
            usuarios.append(Usuario(d[1],d[2],d[0]))
            return usuarios
    
    def actualizar(self, usuario):
        cursor = self.db.get_cursor()
        cursor.execute(
            "UPDATE usuarios SET nombre=%s, email=%s WHERE id=%s",
            (usuario.nombre, usuario.email, usuario.id)
        )

    def eliminar(self, id):
        cursor = self.db.get_cursor()
        cursor.execute("DELETE FROM usuario WHERE id=%s",(id,))
        self.db.commit()
