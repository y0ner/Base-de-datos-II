from dataclasses import field
from statistics import mode
from MisApps.categorias.models import Categoria
from MisApps.categorias.serializers import CategoriaSerializer

from rest_framework import serializers
from MisApps.categorias.models import Categoria

class CategoriaSerializer(serializers.ModelSerializer):
    # len_nombreCliente = serializers.SerializerMethodField()
    class Meta:
        model = Categoria
        fields = "__all__"  #incluir todos los campos