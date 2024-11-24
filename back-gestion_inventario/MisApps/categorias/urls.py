from django.urls import path
#from MisApps.categorias.views import home
from MisApps.categorias.views import CategoriaList, CategoriaDetail

app_name = "Categorias"
urlpatterns = [
    #path('inicio/', home, name= 'home'),
    path('', CategoriaList.as_view()),
    path('<int:pk>', CategoriaDetail.as_view()),
]