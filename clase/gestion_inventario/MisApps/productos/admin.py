from django.contrib import admin
from MisApps.productos.models import Producto
# Register your models here.

class ClienteAdmin(admin.ModelAdmin):
    pass

admin.site.register(Producto, ClienteAdmin)

