from django.urls import path
from Apps.productos.views import ProductoList, ProductoDetail, TipoProductoList, TipoProductoDetail, get_productos_with_tipoproductos

app_name = "productos"

urlpatterns = [
    path('', ProductoList.as_view(), name='producto-list'),
    path('<int:pk>/', ProductoDetail.as_view(), name='producto-detail'),
    path('tipo-productos/', TipoProductoList.as_view(), name='tipoproducto-list'),
    path('tipo-productos/<int:pk>/', TipoProductoDetail.as_view(), name='tipoproducto-detail'),
    path('productos-con-tipo/', get_productos_with_tipoproductos, name='producto-con-tipo-list')
    
]
