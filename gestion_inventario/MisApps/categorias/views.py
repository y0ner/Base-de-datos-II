from django.shortcuts import render
from rest_framework import generics
from MisApps.categorias.models import Categoria
from MisApps.categorias.serializers import CategoriaSerializer

# Create your views here.


# Lista y creación de categorías
class CategoriaList(generics.ListCreateAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

# Detalle, actualización y eliminación de categorías
class CategoriaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

