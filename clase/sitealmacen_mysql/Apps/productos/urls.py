from django.urls import path
from Apps.productos.views import ProductoList, ProductoDetail

app_name = "productos"

urlpatterns = [
    path('', ProductoList.as_view(), name='producto-list'),
    path('<int:pk>/', ProductoDetail.as_view(), name='producto-detail'),
]
