from dataclasses import field
from statistics import mode

from rest_framework import serializers
from MisApps.inventarios.models import Inventario

class InventarioSerializer(serializers.ModelSerializer):
    # len_nombreCliente = serializers.SerializerMethodField()
    class Meta:
        model = Inventario
        fields = "__all__"  #incluir todos los campos