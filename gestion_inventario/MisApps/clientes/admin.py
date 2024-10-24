
from django.contrib import admin
from MisApps.clientes.models import Cliente

# Register your models here.

class ClienteAdmin(admin.ModelAdmin):
    pass


admin.site.register(Cliente, ClienteAdmin)
