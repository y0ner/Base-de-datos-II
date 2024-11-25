from dataclasses import field
from statistics import mode

from rest_framework import serializers
from MyApps.products.models import Product
from MyApps.categories.models import Category
from MyApps.categories.serializers import CategorySerializer

class ProductSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())  # Only accepts the category ID in the request

    class Meta:
        model = Product
        fields = "__all__"

    # This converts the ID into a complete object when returning the response
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['category'] = CategorySerializer(instance.category).data
        return representation
