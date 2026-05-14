from config.db import Database
from services.usuario_service import UsuarioService
from services.tarea_service import TareaService
from services.categoria_service import CategoriaService

from models.usuario import Usuario
from models.tarea import Tarea
from models.categoria import Categoria


def menu():

    db = Database()
    db.connect()

    usuario_service = UsuarioService(db)
    tarea_service = TareaService(db)
    categoria_service = CategoriaService(db)

    while True:
        print("\n--- SISTMEA CRUD ---")
        print("1. Usuarios")
        print("2. Tareas")
        print("3. Categoria")
        print("4. Salir")

        opcion = input("Opcion: ")

        if opcion == "1":
            while True:
                print("\n--- Usuario ---")
                print("1. Crear")
                print("2. Listar")
                print("3. Actualizar")
                print("4. Eliminar")
                print("5. Salir")

                op = input("Opcion: ")

                if op == "1":
                    nombre = input("Nombre: ")
                    email = input("Email: ")
                    usuario_service.crear(Usuario(nombre, email))
                
                elif op == "2":
                    for u in usuario_service.listar():
                        print(u)
                
                elif op == "3":
                    id = int(input("ID: "))
                    nombre = input("Nuevo nombre: ")
                    email = input("Nuevo email: ")
                    usuario_service.actualizar(Usuario(nombre,email,id))
                
                elif op == "4":
                    id = int(input("ID: "))
                    usuario_service.eliminar(id)
                
                elif op == "5":
                    db.close()
                    break
        
        elif opcion == "2":
            menu_tareas(tarea_service) 
        
        elif opcion == "3":
            menu_categoria(categoria_service) 

        elif opcion == "4":
            print("Saliste")
            db.close()
            break

def menu_tareas(service:TareaService):

    while True:
        print("\n--- TAREAS ---")
        print("1. Crear tarea")
        print("2. Listar tarea")
        print("3. Actualizar tarea")
        print("4. Eliminar tarea")
        print("5. Volver")

        op = input("Opcion: ")

        if op == "1":
            titulo = input("Titulo: ")
            descripcion = input("Descripcion: ")
            categoria_id = input("ID categoria: ")
            usuario_id = input("ID usuario: ")
            service.crear(Tarea(titulo, descripcion, categoria_id, usuario_id))
        
        elif op == "2":
            tareas = service.listar()
            for t in  tareas:
                print(f"{t[0]} | {t[1]} | {t[2]} | {t[3]} | Usuario: {t[4]}")
        
        elif op == "3":
            id = int(input("ID tarea: "))
            titulo = input("Nuevo titulo: ")
            descripcion = input("Nueva descripcion: ")
            categoria_id = input("Nueva ID categoria: ")
            usuario_id = input("Nuevo ID usuario: ")
            service.actualizar(Tarea(titulo, descripcion, categoria_id, usuario_id, id))
        
        elif op == "4":
            id = int(input("ID tarea a eliminar: "))
            service.eliminar(id)
        
        elif op == "5":
            break

def menu_categoria(service:CategoriaService):

    while True:
        print("\n--- CATEGORIA ---")
        print("1. Crear categoria")
        print("2. Listar categoria")
        print("3. Actualizar categoria")
        print("4. Eliminar categoria")
        print("5. Volver")

        op = input("Opcion: ")

        if op == "1":
            nombre = input("Nombre categoria: ")
            service.crear(Categoria(nombre))
        
        elif op == "2":
            categorias = service.listar()
            for t in  categorias:
                print(f"ID categoria: {t[0]} | Categoria: {t[1]}")
        
        elif op == "3":
            id = int(input("ID categoria: "))
            nombre = input("Nuevo nombre de categoria: ")
            service.actualizar(Categoria(nombre, id))
        
        elif op == "4":
            id = int(input("ID categoria a eliminar: "))
            service.eliminar(id)
        
        elif op == "5":
            break

    
if __name__ == "__main__":
    menu()

