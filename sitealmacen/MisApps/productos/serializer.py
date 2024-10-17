from dataclasses import field
from statistics import mode

from rest_framework import serializers
from MisApps.productos.models import Producto

class ProductoSerializer(serializers.ModelSerializer):
    # len_nombreCliente = serializers.SerializerMethodField()
    class Meta:
        model = Producto
        fields = "__all__"