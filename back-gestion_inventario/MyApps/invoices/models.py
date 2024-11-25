from django.db import models
from MyApps.customers.models import Customer

# Create your models here.
# Model for Invoices
class Invoice(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)  # Relationship with Customer
    invoice_date = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Invoice {self.id} - {self.customer.name}"
