from django.contrib import admin
from MisApps.inventarios.models import Inventario
# Register your models here.

class inentariosAdmin(admin.ModelAdmin):
    pass

admin.site.register(Inventario, inentariosAdmin)