from MyApps.products.serializers import ProductSerializer
from rest_framework import serializers
from MyApps.products.models import Product
from MyApps.invoice_details.models import InvoiceDetail


class InvoiceDetailSerializer(serializers.ModelSerializer):
    description = serializers.SerializerMethodField()
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())  # Only accepts the product ID in requests

    class Meta:
        model = InvoiceDetail
        fields = "__all__"  # Include all model fields

    # Change the representation to return the full product object in the response
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['product'] = ProductSerializer(instance.product).data
        return representation

    def get_description(self, obj):
        return str(obj)  # This returns the value of __str__ from the model


    