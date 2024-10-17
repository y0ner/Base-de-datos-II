from dataclasses import field
from statistics import mode

from rest_framework import serializers
from MisApps.facturas.models import Factura

class FacturaSerializer(serializers.ModelSerializer):
    # len_nombreCliente = serializers.SerializerMethodField()
    class Meta:
        model = Factura
        fields = "__all__"  #incluir todos los campos