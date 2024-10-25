from dataclasses import field
from statistics import mode

from rest_framework import serializers
from MisApps.productos.models import Producto
from MisApps.categorias.models import Categoria
from MisApps.categorias.serializers import CategoriaSerializer

class ProductoSerializer(serializers.ModelSerializer):
    categoria = serializers.PrimaryKeyRelatedField(queryset=Categoria.objects.all())  # Acepta solo el ID de categoría en la solicitud

    class Meta:
        model = Producto
        fields = "__all__"

    # Esto convierte el ID en un objeto completo al devolver la respuesta
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['categoria'] = CategoriaSerializer(instance.categoria).data
        return representation
