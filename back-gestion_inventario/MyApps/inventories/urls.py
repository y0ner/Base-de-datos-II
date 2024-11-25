from django.urls import path
from MyApps.inventories.views import home
from MyApps.inventories.views import InventoryList, InventoryDetail


app_name = "inventories"
urlpatterns = [
    #path('home/', home, name='home'),
    path('', InventoryList.as_view()),
    path('<int:pk>', InventoryDetail.as_view()),
]
