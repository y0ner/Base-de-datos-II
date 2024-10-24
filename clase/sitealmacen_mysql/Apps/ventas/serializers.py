from dataclasses import field
from statistics import mode

from rest_framework import serializers
from Apps.ventas.models import Venta

class VentaSerializer(serializers.ModelSerializer):
    # len_nombreVenta = serializers.SerializerMethodField()
    class Meta:
        model = Venta
        fields = "__all__"
        # exclude = ['passwordVenta']
        # fields = (
        #     'pk',
        #     'nombreVenta',
        #     'direccionVenta',
        #     'telefonoVenta',
        #     'correoVenta',
        #     'passwordVenta',
        # )

    # def get_len_nombreVenta(self, object):
    #     length = len(object.nombreVenta)
    #     return length

    # def validate(self, data):
    #     if data['nombreVenta'] == data['direccionVenta']:
    #         raise serializers.ValidationError('Nombre y Correo No pueden ser iguales')
    #     else:
    #         return data

    def validate_nombreVenta(self, value):
        if len(value) < 3:
            raise serializers.ValidationError('Nombre no puede ser tan corto')
        else:
            return value

    def validate_passwordVenta(self, value):
        if len(value) < 8:
            raise serializers.ValidationError('El Password debe tener mayor de 8 caracteres')
        else:
            return value
