from django.shortcuts import render
from django.http import Http404

from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status

from .models import Producto, TipoProducto
from .serializers import ProductoSerializer, TipoProductoSerializer

from rest_framework.decorators import api_view
from django.db.models import Q
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


class TipoProductoList(generics.ListCreateAPIView):
    queryset = TipoProducto.objects.all()
    serializer_class = TipoProductoSerializer


class TipoProductoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = TipoProducto.objects.all()
    serializer_class = TipoProductoSerializer


@api_view(['GET'])
def get_productos_with_tipoproductos(request):
    productos = Producto.objects.filter(
        Q(cantidad__gte=36) &
        Q(marca__icontains="Oneal-Parker")
    )
     
    serializer = ProductoSerializer(productos, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
