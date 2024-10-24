from django.urls import path
from MisApps.inventarios.views import home
from MisApps.inventarios.views import InventarioList, InventarioDetail


app_name = "clientes"
urlpatterns = [
    #path('inicio/', home, name= 'home'),
    path('', InventarioList.as_view()),
    path('<int:pk>', InventarioDetail.as_view()),
]