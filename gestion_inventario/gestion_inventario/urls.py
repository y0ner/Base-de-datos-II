"""
URL configuration for gestion_inventario project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls import include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('categorias/', include('MisApps.categorias.urls')),
    path('productos/', include('MisApps.productos.urls')),
    path('clientes/', include('MisApps.clientes.urls')),
    path('detalles_facturas/', include('MisApps.detalles_facturas.urls')),
    path('facturas/', include('MisApps.facturas.urls')),
    path('inventarios/', include('MisApps.inventarios.urls')),
]
