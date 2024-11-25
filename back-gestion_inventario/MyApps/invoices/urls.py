from django.urls import path
from MyApps.invoices.views import InvoiceList, InvoiceDetail

app_name = "Invoices"
urlpatterns = [
    #path('home/', home, name='home'),
    path('', InvoiceList.as_view()),
    path('<int:pk>', InvoiceDetail.as_view()),
]
