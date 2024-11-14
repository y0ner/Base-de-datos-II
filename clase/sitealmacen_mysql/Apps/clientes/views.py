from django.shortcuts import render
from django.http import Http404

from rest_framework.response import Response
from rest_framework import generics

from rest_framework import status

from Apps.clientes.models import Cliente
from Apps.clientes.serializers import ClienteSerializer

# Create your views here.


class ClienteList(generics.ListCreateAPIView):
    """
    Lista de Clientes
    """

    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer



class ClienteDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete de los clientes por pk
    """
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
