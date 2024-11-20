from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics, status

from MisApps.Ventas.models import Venta, ProductoVenta
from MisApps.Ventas.serializers import VentaSerializer, ProductoVentaSerializer

# Vista inicial de la aplicación
def home(request):
    return HttpResponse("Bienvenidos, Uniguajira! - Aplicación Ventas")

class VentaList(generics.ListCreateAPIView):
    """
    Lista y crea ventas
    """
    queryset = Venta.objects.all()
    serializer_class = VentaSerializer

class VentaDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update o delete de una venta por pk
    """
    queryset = Venta.objects.all()
    serializer_class = VentaSerializer

class ProductoVentaList(generics.ListCreateAPIView):
    """
    Lista y crea productos relacionados con ventas
    """
    queryset = ProductoVenta.objects.all()
    serializer_class = ProductoVentaSerializer

class ProductoVentaDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update o delete de un producto relacionado con una venta por pk
    """
    queryset = ProductoVenta.objects.all()
    serializer_class = ProductoVentaSerializer
