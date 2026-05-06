import mysql.connector

class Database:
    def __init__(self):
        self.connection = None
    
    def connect(self):
        self.connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="ejemplo_db"
        )
        print("Conectado")
    
    def get_cursor(self):
        return self.connection.cursor()
    
    def commit(self):
        self.connection.commit()

    def close(self):
        self.connection.close()

    
