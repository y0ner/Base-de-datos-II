from django.http import HttpResponse
from django.shortcuts import render
from django.http import Http404

from rest_framework.response import Response
from rest_framework import generics

from rest_framework import status

from MisApps.detalles_facturas.models import DetalleFactura
from MisApps.detalles_facturas.serializers import DetalleFacturaSerializer

# Create your views here.


def home(request):
    return HttpResponse("Bienvenidos, Uniguajira!- Aplicación detalles_facturas")


class DetalleFacturaList(generics.ListCreateAPIView):
    """
    Lista de Clientes
    """

    queryset = DetalleFactura.objects.all()
    serializer_class = DetalleFacturaSerializer



class DetalleFacturaDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete de los clientes por pk
    """
    queryset = DetalleFactura.objects.all()
    serializer_class = DetalleFacturaSerializer