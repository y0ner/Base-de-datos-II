from dataclasses import field
from statistics import mode

from rest_framework import serializers
from MyApps.customers.models import Customer

class CustomerSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Customer
        fields = "__all__"  # Include all fields
