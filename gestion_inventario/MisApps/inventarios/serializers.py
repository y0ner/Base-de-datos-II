from dataclasses import field
from statistics import mode

from rest_framework import serializers
from MisApps.inventarios.models import Inventario
from MisApps.productos.models import Producto
from MisApps.productos.serializers import ProductoSerializer


class InventarioSerializer(serializers.ModelSerializer):
    producto = serializers.PrimaryKeyRelatedField(queryset=Producto.objects.all()) 
    # len_nombreCliente = serializers.SerializerMethodField()
    class Meta:
        model = Inventario
        fields = "__all__"  #incluir todos los campos
    
       # Cambia la representación para devolver el objeto cliente completo en la respuesta
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['producto'] = ProductoSerializer(instance.producto).data
        return representation