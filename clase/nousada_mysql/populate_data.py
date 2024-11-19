import os
import django
import random
from faker import faker

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sitealmacen.settings')
django.setup()

from Apps.clientes.models import Cliente 
from Apps.productos.models import TipoProducto, Venta
from Apps.ventas.models import Venta, VentaProducto 
from Apps.clientes.models import User

# n representa el numero de registros
def create_clientes(n=10):
    for _ in range(n):
        Cliente.objects.create(
            nombre=fake.name(),
            direccion=fake.address(),
            telefono=fake.phone_number()[:12], #Limitar a 12 catacteres
            correo=fake.unique.email(), #Correo de tipo unico
            password=fake.password(length=10) #Contraseña de 10 caracteres
            estado=True
        )

def create_tipo_productoo(n=5):
    tipo_productos = list(TipoProducto.objects.all())
    for _ in range (n):
        Producto.objects.create(
            nombre
        )    
        
def crete_venta_productos(n=50):
    ventas = list(venta.ob)