from django.shortcuts import render
from django.http import Http404

from rest_framework.response import Response
from rest_framework import generics

from rest_framework import status

from Apps.ventas.models import Venta
from Apps.ventas.serializers import VentaSerializer

# Create your views here.


class VentaList(generics.ListCreateAPIView):
    """
    Lista de Ventas
    """

    queryset = Venta.objects.all()
    serializer_class = VentaSerializer



class VentaDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete de los ventas por pk
    """
    queryset = Venta.objects.all()
    serializer_class = VentaSerializer
