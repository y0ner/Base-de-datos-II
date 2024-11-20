from rest_framework import serializers
from MisApps.producto.models import TipoProducto, Producto
from MisApps.clientes.models import Cliente
from MisApps.Ventas.models import Venta, ProductoVenta

class TipoProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoProducto
        # fields = "__all__"
        fields = ['id', 'nombre']

class ProductoSerializer(serializers.ModelSerializer):
    tipoproducto = TipoProductoSerializer()
    class Meta:
        model = Producto
        # fields = "__all__"
        fields = ['id', 'nombre', 'marca', 'precio', 'stockmin', 'cantidad', 'tipoproducto']


class ProductoAgrupado(serializers.Serializer):
    tipoproducto = serializers.IntegerField()  # Suponiendo que 'tipoproducto' es un ID o clave foránea
    total = serializers.IntegerField()  # Campo que cuenta la cantidad de productos
    
class ProductoAgrupadoRelacionado(serializers.Serializer):
    tipoproducto = serializers.IntegerField()
    tipoproducto__nombre = serializers.CharField()
    total = serializers.IntegerField()




class ProductoVentaSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer(read_only=True)

    class Meta:
        model = ProductoVenta
        fields = ['producto', 'cantidad', 'precio', 'total']    

class VentaSerializer(serializers.ModelSerializer):
    productos = ProductoVentaSerializer(source='ventaproducto_set', many=True, read_only=True)

    class Meta:
        model = Venta
        fields = ['id', 'fecha', 'descuento', 'total', 'subtotal', 'productos']
        
class ClienteVentaSerializer(serializers.ModelSerializer):
    ventas = VentaSerializer(source='venta_set', many=True, read_only=True)

    class Meta:
        model = Cliente
        fields = ['id', 'nombre', 'correo', 'ventas']


class ClienteCompletoSerializer(serializers.ModelSerializer):

    class TipoProductoSerializer(serializers.ModelSerializer):
        class Meta:
            model = TipoProducto
            fields = ['id', 'nombre']

    class ProductoSerializer(serializers.ModelSerializer):
        tipoproducto = TipoProductoSerializer()

        class Meta:
            model = Producto
            fields = ['id', 'nombre', 'marca', 'precio', 'stockmin', 'cantidad', 'tipoproducto']

    class ProductoVentaSerializer(serializers.ModelSerializer):
        producto = ProductoSerializer()

        class Meta:
            model = ProductoVenta
            fields = ['id', 'fechaVenta', 'precio', 'cantidad', 'total', 'producto']

    class VentaSerializer(serializers.ModelSerializer):
        ventaproducto_set = ProductoVentaSerializer(many=True)

        class Meta:
            model = Venta
            fields = ['id', 'fecha', 'descuento', 'total', 'subtotal', 'created', 'updated', 'ventaproducto_set']

    ventas_set = VentaSerializer(many=True, source='venta_set')  # Relación anidada con Venta

    class Meta:
        model = Cliente
        fields = ['id', 'nombre', 'direccion', 'telefono', 'correo', 'estado', 'ventas_set']