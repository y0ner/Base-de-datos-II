from django.urls import path
from MyApps.customers.views import home
from MyApps.customers.views import CustomerList, CustomerDetail


app_name = "customers"
urlpatterns = [
    #path('home/', home, name='home'),
    path('', CustomerList.as_view()),
    path('<int:pk>', CustomerDetail.as_view()),
]
