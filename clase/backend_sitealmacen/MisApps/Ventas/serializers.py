from rest_framework import serializers
from MisApps.Ventas.models import Venta, ProductoVenta
from MisApps.clientes.models import Cliente
from MisApps.clientes.serializers import ClienteSerializer
from MisApps.producto.models import Producto
from MisApps.producto.serializers import ProductoSerializer

class VentaSerializer(serializers.ModelSerializer):
    cliente = serializers.PrimaryKeyRelatedField(queryset=Cliente.objects.all())  # Solo acepta el ID de cliente en solicitudes

    class Meta:
        model = Venta
        fields = "__all__"  # Incluir todos los campos

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['cliente'] = ClienteSerializer(instance.cliente).data
        return representation

class ProductoVentaSerializer(serializers.ModelSerializer):
    producto = serializers.PrimaryKeyRelatedField(queryset=Producto.objects.all())  # Solo acepta el ID del producto en solicitudes
    venta = serializers.PrimaryKeyRelatedField(queryset=Venta.objects.all())  # Solo acepta el ID de la venta en solicitudes

    class Meta:
        model = ProductoVenta
        fields = "__all__"  # Incluir todos los campos

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['producto'] = ProductoSerializer(instance.producto).data
        representation['venta'] = VentaSerializer(instance.venta).data
        return representation
