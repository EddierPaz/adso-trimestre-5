from config.db import Database
from services.usuario_service import UsuarioService
from models.usuario import Usuario

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
            nombre = input("Nombre: ")
            email = input("Email: ")
            service.crear(Usuario(nombre, email))
        
        elif op == "2":
            for u in service.listar():
                print(u)
        
        elif op == "3":
            id = int(input("ID: "))
            nombre = input("Nuevo nombre: ")
            email = input("Nuevo email: ")
            service.actualizar(Usuario(nombre,email,id))
        
        elif op == "4":
            id = int(input("ID: "))
            service.eliminar(id)
        
        elif op == "5":
            db.close()
            break
    
if __name__ == "__main__":
    main()

