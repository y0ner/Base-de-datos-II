from django.db import models
from MyApps.invoices.models import Invoice
from MyApps.products.models import Product

# Create your models here.
# Model for Invoice Details
class InvoiceDetail(models.Model):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name='details')  # Relationship with Invoice
    product = models.ForeignKey(Product, on_delete=models.CASCADE)  # Relationship with Product
    quantity = models.IntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Invoice {self.invoice.id} - Customer {self.invoice.customer.name}"
        # return f"Detail {self.invoice.id} - {self.product.name}"
