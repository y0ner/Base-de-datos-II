from django.contrib import admin
from .models import Venta, ProductoVenta

# Configuración para el modelo Venta
class VentaAdmin(admin.ModelAdmin):
    list_display = ('id', 'fecha_venta', 'subtotal', 'impuestos', 'descuentos', 'total', 'cliente', 'created_at', 'updated_at')
    search_fields = ('cliente__nombreCliente',)  # Agrega un buscador por el nombre del cliente
    list_filter = ('created_at', 'updated_at')  # Filtros por fechas de creación y actualización

# Configuración para el modelo ProductoVenta
class ProductoVentaAdmin(admin.ModelAdmin):
    list_display = ('id', 'producto', 'venta', 'cantidad', 'precio', 'total', 'created_at', 'updated_at')
    search_fields = ('producto__nombre', 'venta__id')  # Permite buscar por nombre del producto o ID de la venta
    list_filter = ('created_at', 'updated_at')  # Filtros por fechas de creación y actualización

# Registro de modelos en el administrador
admin.site.register(Venta, VentaAdmin)
admin.site.register(ProductoVenta, ProductoVentaAdmin)
