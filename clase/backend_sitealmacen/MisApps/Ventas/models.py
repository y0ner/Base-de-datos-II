from django.db import models
from MisApps.clientes.models import Cliente
from MisApps.producto.models import Producto

class Venta(models.Model):
    fecha_venta = models.CharField(max_length=255)
    subtotal = models.FloatField()
    impuestos = models.FloatField()
    descuentos = models.FloatField()
    total = models.FloatField()
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name='ventas')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Venta {self.id} - Cliente: {self.cliente.nombre}"  # Usa el nombre correcto del campo

class ProductoVenta(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='ventas_producto')
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE, related_name='detalle_ventas')
    cantidad = models.IntegerField()
    precio = models.FloatField()
    total = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Producto: {self.producto.nombre} - Venta: {self.venta.id}"
