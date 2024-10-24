from django.urls import path
from Apps.clientes.views import ClienteList, ClienteDetail

app_name = "clientes"

urlpatterns = [
    path('', ClienteList.as_view(), name='cliente-list'),
    path('<int:pk>/', ClienteDetail.as_view(), name='cliente-detail'),
]
