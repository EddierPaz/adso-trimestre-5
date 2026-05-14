#Nombre/identificador de la clase 
#Class es palabra reservada y va la primera en mayuscula
class Coche:
    #atributos de la clase
    ruedas = 4
    # constructor
    def __init__(self,color,aceleracion):
        #atributos de la instancia
        self.color = color
        self.aceleracion = aceleracion
        self.velocidad = 0
    #metodos
    def acelera(self):
        self.velocidad= self.velocidad+self.aceleracion
        return self.velocidad
    def frena(self):
        v= self.velocidad - self.aceleracion
        if  v<0:
            v=0
        self.velocidad=v
        return self.velocidad

carro = Coche("Azul",50)
print(carro.color)
print(carro.acelera())
print(carro.frena())


class CocheVolador(Coche):
    ruedas = 6
    def __init__(self, color, aceleracion, esta_volando=False):
        # la función super(). Esta función devuelve un objeto temporal de la superclase que permite invocar a los métodos definidos en la misma.
        super().__init__(color, aceleracion)
        #se crea el atributo de instancia esta_volando solo para objetos de la clase CocheVolador.
        self.esta_volando = esta_volando

    def vuela(self):
        self.esta_volando = True

    def aterriza(self):
        self.esta_volando = False

c = Coche("Azul", 10)
cv1 = CocheVolador("rojo", 60)

print(cv1.color)
print(cv1.color)

cv1.acelera()

print(cv1.velocidad)


class A:
    def __init__(self):
        self._contador = 0  # Este atributo es privado
    def incrementa(self):
        self._contador += 1
    def cuenta(self):
        return self._contador

class B(object):
    def __init__(self):
        self.__contador = 0  # Este atributo es privado
    def incrementa(self):
        self.__contador += 1
    def cuenta(self):
        return self.__contador
a = A()
a.incrementa()
a.incrementa()
a.incrementa()
print(a.cuenta()) #3
print(a._contador) #3


