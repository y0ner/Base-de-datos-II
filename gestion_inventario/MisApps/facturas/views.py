from django.http import HttpResponse

from django.shortcuts import render
from django.http import Http404

from rest_framework.response import Response
from rest_framework import generics

from rest_framework import status

from MisApps.facturas.models import Factura
from MisApps.facturas.serializers import FacturaSerializer

# Create your views here.


def home(request):
    return HttpResponse("Bienvenidos, Uniguajira!- Aplicación Clientes")

class FacturaList(generics.ListCreateAPIView):
    """
    Lista de Clientes
    """

    queryset = Factura.objects.all()
    serializer_class = FacturaSerializer



class FacturaDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete de los clientes por pk
    """
    queryset = Factura.objects.all()
    serializer_class = FacturaSerializer
