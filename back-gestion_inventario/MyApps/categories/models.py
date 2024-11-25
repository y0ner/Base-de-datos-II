from django.db import models  # type: ignore

# Create your models here.

# Model for Categories
class Category(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name
