from django.urls import path
from MisApps.Ventas.views import home, VentaList, VentaDetail, ProductoVentaList, ProductoVentaDetail

app_name = "ventas"

urlpatterns = [
    path('', VentaList.as_view(), name='venta-list'),  # Lista y creación de ventas
    path('<int:pk>', VentaDetail.as_view(), name='venta-detail'),  # Detalle, actualización o eliminación de una venta
    path('productos-ventas/', ProductoVentaList.as_view(), name='productoventa-list'),  # Lista y creación de productos en ventas
    path('productos-ventas/<int:pk>/', ProductoVentaDetail.as_view(), name='productoventa-detail'),  # Detalle, actualización o eliminación de un producto en venta
]
