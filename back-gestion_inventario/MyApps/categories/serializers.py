from dataclasses import field
from statistics import mode
from rest_framework import serializers
from MyApps.categories.models import Category

class CategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields = "__all__"  # Include all fields
