from dataclasses import field
from statistics import mode

from rest_framework import serializers
from .models import Producto, TipoProducto


class TipoProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoProducto
        fields = "__all__"
        
class ProductoSerializer(serializers.ModelSerializer):
    tipoproducto = TipoProductoSerializer()
    class Meta:
        model = Producto
        # fields = "__all__"
        fields = ["id", "nombre", "marca", "precio", "stockmin", "cantidad", "tipoproducto"]
  
    def validate_nombreProducto(self, value):
        if len(value) < 3:
            raise serializers.ValidationError('Nombre no puede ser tan corto')
        else:
            return value

    def validate_passwordProducto(self, value):
        if len(value) < 8:
            raise serializers.ValidationError('El Password debe tener mayor de 8 caracteres')
        else:
            return value
        
