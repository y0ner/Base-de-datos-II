from rest_framework import serializers
from MyApps.invoices.models import Invoice
from MyApps.customers.models import Customer
from MyApps.customers.serializers import CustomerSerializer

class InvoiceSerializer(serializers.ModelSerializer):
    customer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all())  # Only accepts the customer ID in requests
    
    class Meta:
        model = Invoice
        fields = "__all__"  # Include all model fields

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['customer'] = CustomerSerializer(instance.customer).data
        return representation
