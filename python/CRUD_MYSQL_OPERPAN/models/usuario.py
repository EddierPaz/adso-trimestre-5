class Tarea:
    def __init__(self, nombre_tipo_tarea, id_tipo_tarea=None):
        self.id_tipo_tarea = id_tipo_tarea
        self.nombre_tipo_tarea = nombre_tipo_tarea 

    def __str__(self):
        return f"{self.id_tipo_tarea}-{self.nombre_tipo_tarea}"
    