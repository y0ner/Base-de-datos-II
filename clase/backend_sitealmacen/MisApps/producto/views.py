from itertools import count
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.http import Http404
from MisApps.producto.models import Producto, TipoProducto
from MisApps.clientes.models import Cliente
from MisApps.producto.serializers import ProductoSerializer, TipoProductoSerializer, ProductoAgrupado, ProductoAgrupadoRelacionado, ClienteVentaSerializer, ClienteCompletoSerializer
from MisApps.Ventas.models import Venta
from django.db.models import Q
from django.db.models import Count

class ProductoList(APIView):
    """
    Lista de Productos y creación de un nuevo producto
    """
    def get(self, request, format=None):
        productos = Producto.objects.all()
        serializer = ProductoSerializer(productos, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ProductoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductoDetail(APIView):
    """
    Retrieve, update o delete de un producto por pk
    """
    def get_object(self, pk):
        try:
            return Producto.objects.get(pk=pk)
        except Producto.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        producto = self.get_object(pk)
        serializer = ProductoSerializer(producto)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        producto = self.get_object(pk)
        serializer = ProductoSerializer(producto, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        producto = self.get_object(pk)
        serializer = ProductoSerializer(producto, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        producto = self.get_object(pk)
        producto.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class TipoProductoList(APIView):
    """
    Lista de TipoProductos y creación de un nuevo tipo de producto
    """
    def get(self, request, format=None):
        tipoproductos = TipoProducto.objects.all()
        serializer = TipoProductoSerializer(tipoproductos, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = TipoProductoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TipoProductoDetail(APIView):
    """
    Retrieve, update o delete de un tipo de producto por pk
    """
    def get_object(self, pk):
        try:
            return TipoProducto.objects.get(pk=pk)
        except TipoProducto.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        tipoproducto = self.get_object(pk)
        serializer = TipoProductoSerializer(tipoproducto)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        tipoproducto = self.get_object(pk)
        serializer = TipoProductoSerializer(tipoproducto, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        tipoproducto = self.get_object(pk)
        serializer = TipoProductoSerializer(tipoproducto, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        tipoproducto = self.get_object(pk)
        tipoproducto.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def get_productos_with_tipoproductos(request):
    # user_id = request.data.get('id')
    # resource_path = request.data.get('resourcePath')
    # resource_method = request.data.get('resourceMethod')
    # cantidad_min = request.query_params.get('cantidad_min', 10)
    # tipo_nombre = request.query_params.get('tipo_nombre', 'Electrónica')
    
    """
    *****************  Productos General  *********************
    """
    # productos = Producto.objects.all()
    
    # # Serializamos los datos
    # serializer = ProductoSerializer(productos, many=True)
    
    
    """
    **********************************************************
    """
    
    """
    *****************  Productos Con Condiciones  Basicas - Consulta1 *********************
    """
    
    
    # productos = Producto.objects.filter(
    #     Q(cantidad=36) &
    #     Q(marca__icontains="Oneal-Parker")

    # )
    
    # # Serializamos los datos
    # serializer = ProductoSerializer(productos, many=True)
    
    
    """
    **********************************************************
    """
    
    
    """
    *****************  Productos Con Condiciones  Basicas con Parametros Body*********************
    
    
    """
    # cantidad = request.data.get('cantidad', None)  # Por defecto es None si no se envía
    # marca = request.data.get('marca', None)
    # consulta = Q()
    
    # # Agregar condiciones solo si los valores no son None
    # if cantidad is not None:
    #     consulta &= Q(cantidad__gte=cantidad)
    # if marca:
    #     consulta &= Q(marca__icontains=marca)
    # productos = Producto.objects.filter(consulta)
    
    # # Serializamos los datos
    # serializer = ProductoSerializer(productos, many=True)
    
    
    """
    **********************************************************
    """
    
    
    
    """
    **********************************************************
    """
    
    """
    *****************  Productos Con Condiciones  Complejas *********************
    
    """
    # productos = Producto.objects.filter(
    # Q(cantidad__lte=85) & 
    # Q(cantidad__gte=50) |  # Esta condición aplica `OR`
    # (Q(precio__gte=1000) & Q(precio__lte=5000))  # Condiciones combinadas con `AND`
    # )
    
    
    # # Serializamos los datos
    # serializer = ProductoSerializer(productos, many=True)
    
    
    """
    **********************************************************
    """
    
    
    """
    *****************  Productos Con Condiciones de Texto *********************
    """
    # productos = Producto.objects.filter(
    # Q(cantidad__lte=85) &
    # Q(nombre__icontains="smartphone") |  # Nombre contiene la palabra "smartphone" (insensible a mayúsculas)
    # Q(marca__endswith="Pro")  # Marca termina en "Pro"
    # )
    
    # # Serializamos los datos
    # serializer = ProductoSerializer(productos, many=True)
    
    
    """
    **********************************************************
    """
    
    
    """
    *****************  Productos Agrupadas *********************
    """
    # productos = Producto.objects.values('tipoproducto').annotate(total=Count('tipoproducto'))
    
    # # Serializamos los datos
    # serializer = ProductoAgrupado(productos, many=True)
    
    
    """
    **********************************************************
    """
    
    
    
    """
    *****************  Productos Agrupadas relacionado *********************
    """
    # # productos = Producto.objects.values('tipoproducto', 'tipoproducto__nombre').annotate(total=Count('id'))
    # productos = Producto.objects.filter(
    # cantidad__gte=5,
    # tipoproducto__nombre__icontains="Electrónica"
    # ).values(
    #     'tipoproducto', 'tipoproducto__nombre'
    # ).annotate(
    #     total=Count('id')
    # )
    # # Serializamos los datos
    # serializer = ProductoAgrupadoRelacionado(productos, many=True)
    
    
    """
    **********************************************************
    """
    
    
    
    
    """
    **********************************************************
    """
    
    
    """
    *****************  Productos Agrupadas *********************
    """
    # Cliente.objects.select_related('venta')
    productos = Cliente.objects.prefetch_related(
        'venta_set__ventaproducto_set__producto'
    ).annotate(
        total_ventas=Count('Ventas')
    )
    
    serializer = ClienteVentaSerializer(productos, many=True)
    
    """
    **********************************************************
    """
    
    
    
    
    """
    *****************  Cliente, Venta, VentaProducto, Producto, Tipo Porducto Relacionados *********************
    """
    # productos = Cliente.objects.prefetch_related(
    #     'venta_set__ventaproducto_set__producto__tipoproducto'
    # ).all()
    
    # serializer = ClienteCompletoSerializer(productos, many=True)
    
    """
    **********************************************************
    """
    
    
    
    
    # Devolvemos los datos en formato JSON
    
    return Response(serializer.data)