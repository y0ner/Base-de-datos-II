from django.http import HttpResponse
from django.shortcuts import render
from django.http import Http404

from rest_framework.response import Response
from rest_framework import generics

from rest_framework import status

from MyApps.invoice_details.models import InvoiceDetail
from MyApps.invoice_details.serializers import InvoiceDetailSerializer

# Create your views here.

def home(request):
    return HttpResponse("Welcome, Uniguajira! - Invoice Details Application")

class InvoiceDetailList(generics.ListCreateAPIView):
    """
    List of Invoice Details
    """

    queryset = InvoiceDetail.objects.all()
    serializer_class = InvoiceDetailSerializer


class InvoiceDetailDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete invoice details by pk
    """
    queryset = InvoiceDetail.objects.all()
    serializer_class = InvoiceDetailSerializer
