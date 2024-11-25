from django.urls import path
from django.urls import path
from MyApps.products.views import ProductList, ProductDetail

app_name = "Products"
urlpatterns = [
    #path('home/', home, name='home'),
    path('', ProductList.as_view()),
    path('<int:pk>', ProductDetail.as_view()),
]
