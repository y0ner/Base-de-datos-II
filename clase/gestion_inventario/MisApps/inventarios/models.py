from django.db import models
from MisApps.productos.models import Producto

# Create your models here.
class Inventario(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)  # Relación con Producto
    tipo_movimiento = models.CharField(max_length=10)  # Puede ser 'entrada' o 'salida'
    cantidad = models.IntegerField()
    fecha_movimiento = models.DateTimeField()
    observaciones = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.producto.nombre} - {self.tipo_movimiento} - {self.cantidad}"