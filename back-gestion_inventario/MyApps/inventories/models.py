from django.db import models
from MyApps.products.models import Product

# Create your models here.
class Inventory(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)  # Relationship with Product
    movement_type = models.CharField(max_length=10)  # Can be 'entry' or 'exit'
    quantity = models.IntegerField()
    movement_date = models.DateTimeField()
    remarks = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.product.name} - {self.movement_type} - {self.quantity}"

