from django.db import models
from MisApps.clientes.models import Cliente

# Create your models here.
# Modelo para Facturas
class Factura(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)  # Relación con Cliente
    fecha_factura = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Factura {self.id} - {self.cliente.nombre}"