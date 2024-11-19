import os
import django

# Establecer la variable de entorno para el módulo de configuración
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sitealmacen.settings')  # Cambia 'nombre_de_tu_proyecto' por el nombre real de tu proyecto

# Inicializa Django
django.setup()

# Ahora importa tus modelos
from Apps.productos.models import Producto, TipoProducto

# Continúa con tu código para crear productos
tipos_producto = {
    "Ropa": TipoProducto.objects.get(nombre="Ropa"),
    "Electrodomésticos": TipoProducto.objects.get(nombre="Electrodomésticos"),
    "Cosméticos": TipoProducto.objects.get(nombre="Cosméticos"),
    "Juguetes": TipoProducto.objects.get(nombre="Juguetes"),
    "Muebles": TipoProducto.objects.get(nombre="Muebles"),
}

productos = [
    {"nombre": "Camiseta Básica de Algodón", "marca": "EcoWear", "precio": 20000, "stockmin": 10, "cantidad": 50, "tipoproducto": tipos_producto["Ropa"]},
    {"nombre": "Lavadora Automática de 8 kg", "marca": "CleanTech", "precio": 1200000, "stockmin": 5, "cantidad": 15, "tipoproducto": tipos_producto["Electrodomésticos"]},
    {"nombre": "Crema Hidratante de Rosa Mosqueta", "marca": "Belleza Natural", "precio": 35000, "stockmin": 20, "cantidad": 100, "tipoproducto": tipos_producto["Cosméticos"]},
    {"nombre": "Juego de Bloques Creativos", "marca": "KiddoFun", "precio": 45000, "stockmin": 15, "cantidad": 60, "tipoproducto": tipos_producto["Juguetes"]},
    {"nombre": "Sofá de Tres Plazas", "marca": "ComfortHome", "precio": 1500000, "stockmin": 2, "cantidad": 8, "tipoproducto": tipos_producto["Muebles"]},
]

# Guardar productos en la base de datos
for producto in productos:
    p = Producto(
        nombre=producto["nombre"],
        marca=producto["marca"],
        precio=producto["precio"],
        stockmin=producto["stockmin"],
        cantidad=producto["cantidad"],
        tipoproducto=producto["tipoproducto"]
    )
    p.save()

print("Productos añadidos exitosamente.")
