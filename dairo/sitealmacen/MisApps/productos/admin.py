from django.contrib import admin
from MisApps.productos.models import Producto, TipoProducto
# Register your models here.

class ClienteAdmin(admin.ModelAdmin):
    pass

admin.site.register(TipoProducto)
admin.site.register(Producto, ClienteAdmin)
