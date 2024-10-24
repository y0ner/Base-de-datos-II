from django.contrib import admin
from .models import Proyecto, Patrocinador

# Register your models here.

class ProyectoAdmin(admin.ModelAdmin):
    pass

class PatrocinadorAdmin(admin.ModelAdmin):
    pass

admin.site.register(Proyecto, ProyectoAdmin)
admin.site.register(Patrocinador, PatrocinadorAdmin)
