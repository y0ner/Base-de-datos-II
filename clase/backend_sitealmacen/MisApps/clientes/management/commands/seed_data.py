import random
from datetime import datetime, timedelta
from django.core.management.base import BaseCommand
from MisApps.categorias.models import Categoria
from MisApps.clientes.models import Cliente
from MisApps.productos.models import Producto
from MisApps.facturas.models import Factura
from MisApps.detalles_facturas.models import DetalleFactura
from MisApps.inventarios.models import Inventario

# Crear Categorías
def crear_categorias():
    categorias = [
        "Electrónica", "Hogar", "Ropa", "Juguetes", "Alimentos"
    ]
    for nombre in categorias:
        Categoria.objects.create(nombre=nombre)

# Crear Clientes
def crear_clientes():
    nombres = [
        "Juan Perez", "María Lopez", "Carlos Torres", "Ana Rodríguez", "Luis Martinez"
    ]
    direcciones = [
        "Calle 123", "Avenida Siempre Viva", "Calle Falsa 456", "Carrera 7", "Calle 8"
    ]
    for nombre in nombres:
        Cliente.objects.create(
            nombre=nombre,
            direccion=random.choice(direcciones),
            telefono=f"300{random.randint(1000000, 9999999)}",
            email=f"{nombre.replace(' ', '').lower()}@gmail.com"
        )

# Crear Productos
def crear_productos():
    categorias = Categoria.objects.all()
    productos = [
        ("Televisor 40\"", "Electrónica", 1500000),
        ("Laptop HP", "Electrónica", 3000000),
        ("Silla Gamer", "Hogar", 450000),
        ("Camiseta Negra", "Ropa", 25000),
        ("Muñeco de acción", "Juguetes", 80000)
    ]
    for nombre, categoria_nombre, precio in productos:
        categoria = categorias.filter(nombre=categoria_nombre).first()
        Producto.objects.create(
            nombre=nombre,
            categoria=categoria,
            descripcion=f"Descripción de {nombre}",
            precio=precio,
            stock_actual=random.randint(10, 100),
            stock_minimo=5
        )

# Crear Inventarios
def crear_inventarios():
    productos = Producto.objects.all()
    for producto in productos:
        for _ in range(5):  # Crear 5 movimientos de inventario por producto
            tipo_movimiento = random.choice(['entrada', 'salida'])
            cantidad = random.randint(1, 20)
            fecha_movimiento = datetime.now() - timedelta(days=random.randint(1, 30))
            Inventario.objects.create(
                producto=producto,
                tipo_movimiento=tipo_movimiento,
                cantidad=cantidad,
                fecha_movimiento=fecha_movimiento,
                observaciones=f"Movimiento de {tipo_movimiento} para {producto.nombre}"
            )

# Crear Facturas y Detalles de Factura
def crear_facturas():
    clientes = Cliente.objects.all()
    productos = Producto.objects.all()
    for _ in range(10):  # Crear 10 facturas
        cliente = random.choice(clientes)
        factura = Factura.objects.create(
            cliente=cliente,
            fecha_factura=datetime.now() - timedelta(days=random.randint(1, 10)),
            total=0  # Inicialmente en 0, se actualizará luego
        )
        total = 0
        for _ in range(random.randint(1, 5)):  # Crear de 1 a 5 detalles de factura
            producto = random.choice(productos)
            cantidad = random.randint(1, 10)
            precio_unitario = producto.precio
            subtotal = cantidad * precio_unitario
            total += subtotal
            DetalleFactura.objects.create(
                factura=factura,
                producto=producto,
                cantidad=cantidad,
                precio_unitario=precio_unitario,
                subtotal=subtotal
            )
        # Actualizar el total de la factura
        factura.total = total
        factura.save()

# Clase de comando de gestión
class Command(BaseCommand):
    help = 'Genera datos de prueba en la base de datos'

    def handle(self, *args, **kwargs):
        crear_categorias()
        crear_clientes()
        crear_productos()
        crear_inventarios()
        crear_facturas()
        self.stdout.write(self.style.SUCCESS('Datos de prueba generados exitosamente.'))
