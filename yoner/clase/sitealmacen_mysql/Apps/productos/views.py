from django.shortcuts import render
from django.http import Http404

from rest_framework.response import Response
from rest_framework import generics

from rest_framework import status

from Apps.productos.models import Producto
from Apps.productos.serializers import ProductoSerializer

# Create your views here.


class ProductoList(generics.ListCreateAPIView):
    """
    Lista de Productos
    """

    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer



class ProductoDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete de los productos por pk
    """
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
