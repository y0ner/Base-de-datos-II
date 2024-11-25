from django.http import HttpResponse

from django.shortcuts import render
from django.http import Http404

from rest_framework.response import Response
from rest_framework import generics

from rest_framework import status

from MyApps.invoices.models import Invoice
from MyApps.invoices.serializers import InvoiceSerializer

# Create your views here.

def home(request):
    return HttpResponse("Welcome, Uniguajira! - Clients Application")

class InvoiceList(generics.ListCreateAPIView):
    """
    List of Invoices
    """

    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer


class InvoiceDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete invoices by pk
    """
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

