from django.urls import path
from MisApps.clientes.views import home
from MisApps.clientes.views import ClienteList, ClienteDetail


app_name = "clientes"
urlpatterns = [
    #path('inicio/', home, name= 'home'),
    path('', ClienteList.as_view()),
    path('<int:pk>', ClienteDetail.as_view()),
]