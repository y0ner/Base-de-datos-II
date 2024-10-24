from django.contrib import admin
from MisApps.categorias.models import Categoria
# Register your models here.

class CategoriaAdmin(admin.ModelAdmin):
    pass

admin.site.register(Categoria, CategoriaAdmin)

