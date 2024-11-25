from django.urls import path
from MyApps.invoice_details.views import home
from MyApps.invoice_details.views import InvoiceDetailList, InvoiceDetailDetail

app_name = "Invoice_Details"
urlpatterns = [
    #path('home/', home, name='home'),
    path('', InvoiceDetailList.as_view()),
    path('<int:pk>', InvoiceDetailDetail.as_view()),
]
