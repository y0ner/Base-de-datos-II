from django.urls import path
from MisApps.ventas.views import home

urlpatterns = [
    path('inicio/', home, name= 'home'),
]

