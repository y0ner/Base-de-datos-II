from django.http import HttpResponse

from django.shortcuts import render
from django.http import Http404

from rest_framework.response import Response
from rest_framework import generics

from rest_framework import status

from MyApps.products.models import Product
from MyApps.products.serializers import ProductSerializer

# Create your views here.



class ProductList(generics.ListCreateAPIView):
    """
    List of Products
    """

    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete products by pk
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
