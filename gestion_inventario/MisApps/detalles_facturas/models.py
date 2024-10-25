from django.db import models
from MisApps.facturas.models import Factura
from MisApps.productos.models import Producto
# Create your models here.
# Modelo para Detalle de Factura
class DetalleFactura(models.Model):
    factura = models.ForeignKey(Factura, on_delete=models.CASCADE, related_name='detalles')  # Relación con Factura
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)  # Relación con Producto
    cantidad = models.IntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)

    
    def __str__(self):
        return f"Factura {self.factura.id} - Cliente {self.factura.cliente.nombre} "
        # return f"Detalle {self.factura.id} - {self.producto.nombre}"
