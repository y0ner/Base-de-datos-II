from MisApps.productos.serializers import ProductoSerializer
from rest_framework import serializers
from MisApps.productos.models import Producto
from MisApps.detalles_facturas.models import DetalleFactura


class DetalleFacturaSerializer(serializers.ModelSerializer):
    descripcion = serializers.SerializerMethodField()
    producto = serializers.PrimaryKeyRelatedField(queryset=Producto.objects.all())  # Solo acepta el ID de cliente en solicitudes

    class Meta:

        model = DetalleFactura
        fields = "__all__"  # Incluir todos los campos del modelo

     # Cambia la representación para devolver el objeto cliente completo en la respuesta
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['producto'] = ProductoSerializer(instance.producto).data
        return representation

    def get_descripcion(self, obj):
        return str(obj)  # Esto devuelve el valor de __str__ del modelo

    