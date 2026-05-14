class Tarea:
    def __init__(self, titulo, descripcion, usuario_id, categoria_id, id=None):
        self.id = id
        self.titulo = titulo
        self.descripcion = descripcion
        self.categoria_id = categoria_id
        self.usuario_id = usuario_id

    def __str__(self):
        return f"{self.id} - {self.titulo}  (Categoria ID: {self.categoria_id}) (Usuario ID: {self.usuario_id})"
            