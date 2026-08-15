class Usuario:
    def __init__(self, nombre, email, id=None):
        self.id = id
        self.nombre = nombre
        self.email = email

    def __str__(self):
        return f"{self.id}-{self.nombre}-{self.email}"
    