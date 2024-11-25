import os
import django
import random
from faker import Faker
from django.utils import timezone

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gestion_inventario.settings')
django.setup()


from MyApps.customers.models import Customer
from MyApps.categories.models import Category
from MyApps.products.models import Product
from MyApps.invoices.models import Invoice
from MyApps.inventories.models import Inventory
from MyApps.invoice_details.models import InvoiceDetail

fake = Faker()

# Create Customers
def create_customers(n=10):
    """
    Create fake customer data for testing purposes.
    :param n: Number of customers to create
    """
    for _ in range(n):
        Customer.objects.create(
            name=fake.name(),
            address=fake.address(),
            phone=fake.phone_number()[:12],  # Limiting to 12 characters
            email=fake.unique.email()  # Unique email for each customer
        )


# Create Categories
def create_categories(n=5):
    """
    Create fake product categories for testing purposes.
    :param n: Number of categories to create
    """
    for _ in range(n):
        Category.objects.create(
            name=fake.word(),
            description=fake.sentence()
        )

# Create Products
def create_products(n=10):
    """
    Create fake product data for testing purposes.
    :param n: Number of products to create
    """
    categories = list(Category.objects.all())  # Fetch all categories
    for _ in range(n):
        Product.objects.create(
            name=fake.word(),
            category=random.choice(categories),
            description=fake.sentence(),
            price=round(random.uniform(10000, 1000000), 2),
            current_stock=random.randint(10, 100),
            minimum_stock=random.randint(1, 10),
            creation_date=timezone.now(),
            update_date=timezone.now()
        )

# Create Invoices
def create_invoices(n=10):
    """
    Create fake invoice data for testing purposes.
    :param n: Number of invoices to create
    """
    customers = list(Customer.objects.all())  # Fetch all customers
    for _ in range(n):
        Invoice.objects.create(
            customer=random.choice(customers),
            invoice_date=timezone.now(),
            total=round(random.uniform(100000, 5000000), 2)
        )

# Create Invoice Details
def create_invoice_details(n=10):
    """
    Create fake invoice detail data for testing purposes.
    :param n: Number of invoice details to create
    """
    invoices = list(Invoice.objects.all())  # Fetch all invoices
    products = list(Product.objects.all())  # Fetch all products
    for _ in range(n):
        InvoiceDetail.objects.create(
            invoice=random.choice(invoices),
            product=random.choice(products),
            quantity=random.randint(1, 10),
            unit_price=round(random.uniform(10000, 100000), 2),
            subtotal=round(random.uniform(10000, 100000), 2)
        )



# Create Inventories
def create_inventories(n=10):
    """
    Create fake inventory movement data for testing purposes.
    :param n: Number of inventory records to create
    """
    products = list(Product.objects.all())  # Fetch all products
    for _ in range(n):
        Inventory.objects.create(
            product=random.choice(products),
            movement_type=random.choice(['entry', 'exit']),  # Movement type: 'entry' or 'exit'
            quantity=random.randint(1, 100),
            movement_date=timezone.make_aware(fake.date_time_this_year()),  # Ensure correct timezone
            remarks=fake.sentence()  # Notes about the movement
        )

# Llamar las funciones para poblar datos
# Call functions to populate data
create_customers(10)
create_categories(5)
create_products(10)
create_invoices(10)
create_invoice_details(20)
create_inventories(10)

print("Datos generados exitosamente.")
