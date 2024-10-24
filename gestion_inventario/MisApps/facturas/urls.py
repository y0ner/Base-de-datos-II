from django.urls import path
from MisApps.facturas.views import FacturaList, FacturaDetail


app_name = "Facturas"
urlpatterns = [
    #path('inicio/', home, name= 'home'),
    path('', FacturaList.as_view()),
    path('<int:pk>', FacturaDetail.as_view()),
]