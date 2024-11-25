from django.http import HttpResponse

from django.shortcuts import render
from django.http import Http404

from rest_framework.response import Response
from rest_framework import generics

from rest_framework import status

from MyApps.inventories.models import Inventory
from MyApps.inventories.serializers import InventorySerializer

# Create your views here.

def home(request):
    return HttpResponse("Welcome, Uniguajira! - Inventory Application")

class InventoryList(generics.ListCreateAPIView):
    """
    List of Inventory
    """

    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer


class InventoryDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete inventory by pk
    """
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer
