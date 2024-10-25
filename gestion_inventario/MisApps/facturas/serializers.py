from rest_framework import serializers
from MisApps.facturas.models import Factura
from MisApps.clientes.models import Cliente
from MisApps.clientes.serializers import ClienteSerializer

class FacturaSerializer(serializers.ModelSerializer):
    cliente = serializers.PrimaryKeyRelatedField(queryset=Cliente.objects.all())  # Solo acepta el ID de cliente en solicitudes

    class Meta:
        model = Factura
        fields = "__all__"

    # Cambia la representación para devolver el objeto cliente completo en la respuesta
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['cliente'] = ClienteSerializer(instance.cliente).data
        return representation
