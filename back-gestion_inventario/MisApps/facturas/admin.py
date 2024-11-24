from django.contrib import admin
from MisApps.facturas.models import Factura
# Register your models here.

class FacturasAdmin(admin.ModelAdmin):
    pass

admin.site.register(Factura, FacturasAdmin)