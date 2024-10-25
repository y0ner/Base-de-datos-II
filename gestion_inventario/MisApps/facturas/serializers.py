<<<<<<< HEAD
=======
from dataclasses import field
from statistics import mode
from MisApps.clientes.models import Cliente
from MisApps.clientes.serializers import ClienteSerializer

>>>>>>> f1abe7ea (Merge branch 'main' of github.com:y0ner/Base-de-datos-II)
from rest_framework import serializers
from MisApps.facturas.models import Factura
from MisApps.clientes.models import Cliente
from MisApps.clientes.serializers import ClienteSerializer

class FacturaSerializer(serializers.ModelSerializer):
<<<<<<< HEAD
    cliente = serializers.PrimaryKeyRelatedField(queryset=Cliente.objects.all())  # Solo acepta el ID de cliente en solicitudes

    class Meta:
        model = Factura
        fields = "__all__"

    # Cambia la representación para devolver el objeto cliente completo en la respuesta
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['cliente'] = ClienteSerializer(instance.cliente).data
        return representation
=======
    cliente = serializers.PrimaryKeyRelatedField(queryset=Cliente.objects.all())
    # len_nombreCliente = serializers.SerializerMethodField()
    class Meta:
        model = Factura
        fields = "__all__"  #incluir todos los campos

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['cliente'] = ClienteSerializer(instance.cliente).data
        return representation
>>>>>>> f1abe7ea (Merge branch 'main' of github.com:y0ner/Base-de-datos-II)
