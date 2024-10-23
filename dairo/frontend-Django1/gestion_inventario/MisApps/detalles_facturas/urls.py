from django.urls import path
from MisApps.detalles_facturas.views import home
from MisApps.detalles_facturas.views import DetalleFacturaList, DetalleFacturaDetail

app_name = "Detalles_Facturas"
urlpatterns = [
    #path('inicio/', home, name= 'home'),
    path('', DetalleFacturaList.as_view()),
    path('<int:pk>', DetalleFacturaDetail.as_view()),
]