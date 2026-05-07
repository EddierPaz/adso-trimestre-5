class Tarea:
    def __init__(self, titulo, descripcion, usuario_id, id=None):
        self.id = id
        self.titulo = titulo
        self.descripcion = descripcion
        self.usuario_id = usuario_id

    def __str__(self):
        return f"{self.id} - {self.titulo} (Usuario ID: {self.usuario_id})"
            