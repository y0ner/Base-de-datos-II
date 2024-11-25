from django.http import HttpResponse

from django.shortcuts import render
from django.http import Http404

from rest_framework.response import Response
from rest_framework import generics

from rest_framework import status

from MyApps.customers.models import Customer
from MyApps.customers.serializers import CustomerSerializer

# Create your views here.

def home(request):
    return HttpResponse("Welcome, Uniguajira! - Customers Application")

class CustomerList(generics.ListCreateAPIView):
    """
    List of Customers
    """

    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class CustomerDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete customers by pk
    """
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

