from dataclasses import field
from statistics import mode

from rest_framework import serializers
from MyApps.inventories.models import Inventory
from MyApps.products.models import Product
from MyApps.products.serializers import ProductSerializer


class InventorySerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all()) 
    # len_customerName = serializers.SerializerMethodField()
    
    class Meta:
        model = Inventory
        fields = "__all__"  # Include all fields

    # Change the representation to return the full product object in the response
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['product'] = ProductSerializer(instance.product).data
        return representation
