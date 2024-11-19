import os
import django
import random
from faker import Faker
from django.utils import timezone

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gestion_inventario.settings')
django.setup()

from MisApps.clientes.models import Cliente
from MisApps.productos.models import Producto, Categoria
from MisApps.facturas.models import Factura
from MisApps.inventarios.models import Inventario
from MisApps.detalles_facturas.models import DetalleFactura

fake = Faker()

# Crear Clientes
def create_clientes(n=10):
    for _ in range(n):
        Cliente.objects.create(
            nombre=fake.name(),
            direccion=fake.address(),
            telefono=fake.phone_number()[:12],  # Limitar a 12 caracteres
            email=fake.unique.email()  # Correo de tipo único
        )

# Crear Categorías
def create_categorias(n=5):
    for _ in range(n):
        Categoria.objects.create(
            nombre=fake.word(),
            descripcion=fake.sentence()
        )

# Crear Productos
def create_productos(n=10):
    categorias = list(Categoria.objects.all())
    for _ in range(n):
        Producto.objects.create(
            nombre=fake.word(),
            categoria=random.choice(categorias),
            descripcion=fake.sentence(),
            precio=round(random.uniform(10000, 1000000), 2),
            stock_actual=random.randint(10, 100),
            stock_minimo=random.randint(1, 10),
            fecha_creacion=timezone.now(),
            fecha_actualizacion=timezone.now()
        )

# Crear Facturas
def create_facturas(n=10):
    clientes = list(Cliente.objects.all())
    for _ in range(n):
        Factura.objects.create(
            cliente=random.choice(clientes),
            fecha_factura=timezone.now(),
            total=round(random.uniform(100000, 5000000), 2)
        )

# Crear Detalles de Factura
def create_detalles_factura(n=10):
    facturas = list(Factura.objects.all())
    productos = list(Producto.objects.all())
    for _ in range(n):
        DetalleFactura.objects.create(
            factura=random.choice(facturas),
            producto=random.choice(productos),
            cantidad=random.randint(1, 10),
            precio_unitario=round(random.uniform(10000, 100000), 2),
            subtotal=round(random.uniform(10000, 100000), 2)
        )

# Crear Inventarios
def create_inventarios(n=10):
    productos = list(Producto.objects.all())
    for _ in range(n):
        Inventario.objects.create(
            producto=random.choice(productos),
            tipo_movimiento=random.choice(['entrada', 'salida']),
            cantidad=random.randint(1, 100),
            fecha_movimiento=timezone.make_aware(fake.date_time_this_year()),  # Asegurar zona horaria
            observaciones=fake.sentence()
        )

# Llamar las funciones para poblar datos
create_clientes(10)
create_categorias(5)
create_productos(10)
create_facturas(10)
create_detalles_factura(20)
create_inventarios(10)

print("Datos generados exitosamente.")
