from django.contrib import admin
from Apps.clientes.models import Cliente

class ClienteAdmin(admin.ModelAdmin):
    list_display = ('nombreCliente', 'direccionCliente', 'telefonoCliente', 'correoCliente')
    search_fields = ('nombreCliente', 'correoCliente')
    list_filter = ('nombreCliente', 'correoCliente', 'direccionCliente')

admin.site.register(Cliente, ClienteAdmin)
