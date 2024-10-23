from rest_framework.response import Response
from rest_framework.views import APIView

from django.shortcuts import render
from django.http import Http404

from rest_framework.response import Response
from rest_framework import generics

from rest_framework import status

from MisApps.productos.models import TipoProducto
from MisApps.productos.serializer import ProductoSerializer

from MisApps.productos.models import Producto, TipoProducto
from rest_framework.views import APIView


class Producto(APIView):
    """
    Retrieve, update or delete de los clientes por pk
    """
    