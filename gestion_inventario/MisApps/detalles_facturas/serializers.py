from dataclasses import field
from statistics import mode

from rest_framework import serializers
from MisApps.detalles_facturas.models import DetalleFactura

class DetalleFacturaSerializer(serializers.ModelSerializer):
    # len_nombreCliente = serializers.SerializerMethodField()
    class Meta:
        model = DetalleFactura
        fields = "__all__"  #incluir todos los campos