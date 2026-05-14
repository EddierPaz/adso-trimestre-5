class Categoria:
    def __init__(self,nombre, id=None):
        self.id = id
        self.nombre = nombre
    
    def __str__(self):
        return f"{self.id} - {self.nombre}"