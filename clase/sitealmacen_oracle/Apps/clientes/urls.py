"""
Envolviendo Vistas de Api
"""

from django.urls import path
from Apps.clientes.views import cliente_list, cliente_detail

urlpatterns = [
    path('', cliente_list),
    path('<int:pk>/', cliente_detail),
]
