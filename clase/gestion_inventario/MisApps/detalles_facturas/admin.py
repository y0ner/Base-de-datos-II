from django.contrib import admin
from MisApps.detalles_facturas.models import DetalleFactura
# Register your models here.

class DetallesFacturasAdmin(admin.ModelAdmin):
    pass

admin.site.register(DetalleFactura, DetallesFacturasAdmin)