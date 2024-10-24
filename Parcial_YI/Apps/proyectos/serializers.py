from rest_framework import serializers
from .models import Proyecto, Patrocinador

class ProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proyecto
        fields = '__all__'

class PatrocinadorSerializer(serializers.ModelSerializer):
    proyectos = ProyectoSerializer(many=True, read_only=True)

    class Meta:
        model = Patrocinador
        fields = '__all__'

    def validate_nombre(self, value):
        if len(value) < 3:
            raise serializers.ValidationError('El nombre del patrocinador no puede ser tan corto')
        return value
