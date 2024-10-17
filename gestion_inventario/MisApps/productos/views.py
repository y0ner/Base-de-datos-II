from django.http import HttpResponse

from django.shortcuts import render
from django.http import Http404

from rest_framework.response import Response
from rest_framework import generics

from rest_framework import status

from MisApps.productos.models import Producto
from MisApps.productos.serializers import ProductoSerializer

# Create your views here.


def home(request):
    return HttpResponse("Bienvenidos, Uniguajira!- Aplicación Clientes")

class ProductoList(generics.ListCreateAPIView):
    """
    Lista de Producto
    """

    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer



class ProductoDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete de los clientes por pk
    """
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
