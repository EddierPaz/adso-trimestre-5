from config.db import Database
from services.usuario_service import UsuarioService
from models.usuario import Tarea

def main():
    db = Database()
    db.connect()

    service = UsuarioService(db)

    while True:
        print("\n1. Crear")
        print("2. Listar")
        print("3. Actualizar")
        print("4. Eliminar")
        print("5. Salir")

        op = input("Opcion: ")

        if op == "1":
            nombre_tipo_tarea = input("Nombre: ")
            service.crear(Tarea(nombre_tipo_tarea))
        
        elif op == "2":
            tareas = service.listar()
            if not tareas:
                print("No hay tareas registradas.")
            else:
                for t in tareas:
                    print(f"ID: {t.id_tipo_tarea} | Nombre: {t.nombre_tipo_tarea}")
        
        elif op == "3":
            id_tipo_tarea = int(input("ID a actualizar: "))
            nombre_tipo_tarea = input("Nuevo Nombre: ")
            service.actualizar(Tarea(nombre_tipo_tarea, id_tipo_tarea))
        
        elif op == "4":
            id_tipo_tarea = int(input("ID a eliminar: "))
            service.eliminar(id_tipo_tarea)
        
        elif op == "5":
            db.close()
            break
    
if __name__ == "__main__":
    main()