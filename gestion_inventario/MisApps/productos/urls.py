from django.urls import path
from MisApps.productos.views import ProductoList, ProductoDetail


app_name = "Productos"
urlpatterns = [
    #path('inicio/', home, name= 'home'),
    path('', ProductoList.as_view()),
    path('<int:pk>', ProductoDetail.as_view()),
]