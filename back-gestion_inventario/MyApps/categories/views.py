from django.shortcuts import render
from rest_framework import generics
from MyApps.categories.models import Category
from MyApps.categories.serializers import CategorySerializer

# Create your views here.

# List and create categories
class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

# Retrieve, update and delete categories
class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
