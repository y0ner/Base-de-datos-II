from dataclasses import field
from statistics import mode

from rest_framework import serializers
from MisApps.productos.models import Producto
from MisApps.categorias.serializers import CategoriaSerializer

class ProductoSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer()  # Anidar el serializador de categoria
    class Meta:
        model = Producto
        fields = "__all__"  #incluir todos los campos