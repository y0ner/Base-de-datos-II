from django.http import HttpResponse

from django.shortcuts import render
from django.http import Http404

from rest_framework.response import Response
from rest_framework import generics

from rest_framework import status

from MisApps.inventarios.models import Inventario
from MisApps.inventarios.serializers import InventarioSerializer

# Create your views here.


def home(request):
    return HttpResponse("Bienvenidos, Uniguajira!- Aplicación Clientes")

class InventarioList(generics.ListCreateAPIView):
    """
    Lista de Clientes
    """

    queryset = Inventario.objects.all()
    serializer_class = InventarioSerializer



class InventarioDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete de los clientes por pk
    """
    queryset = Inventario.objects.all()
    serializer_class = InventarioSerializer
