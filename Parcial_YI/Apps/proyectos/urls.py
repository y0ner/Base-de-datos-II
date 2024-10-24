from django.urls import path
from .views import patrocinador_list, patrocinador_detail, proyecto_list, proyecto_detail

urlpatterns = [
    path('patrocinadores/', patrocinador_list),
    path('patrocinadores/<int:pk>/', patrocinador_detail),
    path('proyectos/', proyecto_list),
    path('proyectos/<int:pk>/', proyecto_detail),
]
