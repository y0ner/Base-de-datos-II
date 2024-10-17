# Generated by Django 5.1.1 on 2024-09-20 00:22

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('clientes', '0001_initial'),
        ('productos', '0001_initial'),
        ('ventas', '0002_delete_cliente'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Venta',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateField(default=django.utils.timezone.now, verbose_name='Fecha Actual')),
                ('descuento', models.DecimalField(decimal_places=2, max_digits=8, verbose_name='Descuento')),
                ('total', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Total')),
                ('subtotal', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Sub Total')),
                ('created', models.DateTimeField(auto_now=True, verbose_name='Fecha de Creacion')),
                ('updated', models.DateTimeField(auto_now=True, verbose_name='Fecha de Edicion')),
                ('cliente', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='clientes.cliente')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Usuario')),
            ],
            options={
                'verbose_name': 'venta producto',
                'verbose_name_plural': 'Ventas Productos',
            },
        ),
        migrations.CreateModel(
            name='VentaProducto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fechaVenta', models.DateTimeField(auto_now=True, verbose_name='fecha')),
                ('precio', models.IntegerField(verbose_name='Precio')),
                ('cantidad', models.IntegerField(verbose_name='Cantidad')),
                ('total', models.FloatField(verbose_name='Total')),
                ('producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='productos.producto', verbose_name='Producto')),
                ('venta', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ventas.venta', verbose_name='Venta')),
            ],
        ),
        migrations.AddField(
            model_name='venta',
            name='producto',
            field=models.ManyToManyField(through='ventas.VentaProducto', to='productos.producto', verbose_name='VentaProducto'),
        ),
    ]
