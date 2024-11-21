# Importamos las bibliotecas necesarias
from itertools import count  # Para realizar conteos en iteraciones (no usado en el código actual)
from rest_framework.views import APIView  # Para crear vistas basadas en clases (CBV)
from rest_framework.decorators import api_view  # Para crear vistas basadas en funciones (FBV)
from rest_framework.response import Response  # Para devolver respuestas HTTP desde las vistas
from rest_framework import status  # Para manejar códigos de estado HTTP
from django.http import JsonResponse, Http404  # Para devolver JSON y manejar excepciones 404
from MisApps.producto.models import Producto, TipoProducto  # Modelos de productos y tipos de productos
from MisApps.clientes.models import Cliente  # Modelo de cliente
from MisApps.producto.serializers import (  # Serializadores para convertir objetos en JSON
    ProductoSerializer, 
    TipoProductoSerializer, 
    ProductoAgrupado, 
    ProductoAgrupadoRelacionado, 
    ClienteVentaSerializer, 
    ClienteCompletoSerializer
)
from MisApps.Ventas.models import Venta  # Modelo de ventas
from django.db.models import Q, Count, Sum  # Para consultas avanzadas en la base de datos

# Clase para manejar operaciones CRUD de productos
class ProductoList(APIView):
    """
    Lista todos los productos y permite crear un nuevo producto.
    """
    def get(self, request, format=None):
        # Recupera todos los productos y los serializa
        productos = Producto.objects.all()
        serializer = ProductoSerializer(productos, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        # Crea un nuevo producto a partir de los datos proporcionados
        serializer = ProductoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Clase para manejar operaciones CRUD de un producto específico
class ProductoDetail(APIView):
    """
    Obtiene, actualiza o elimina un producto específico por su ID (pk).
    """
    def get_object(self, pk):
        try:
            # Recupera el producto por su clave primaria (pk)
            return Producto.objects.get(pk=pk)
        except Producto.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        # Serializa y devuelve un producto específico
        producto = self.get_object(pk)
        serializer = ProductoSerializer(producto)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        # Actualiza un producto completo
        producto = self.get_object(pk)
        serializer = ProductoSerializer(producto, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        # Actualiza parcialmente un producto
        producto = self.get_object(pk)
        serializer = ProductoSerializer(producto, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        # Elimina un producto
        producto = self.get_object(pk)
        producto.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Clase para manejar operaciones CRUD de los tipos de productos
class TipoProductoList(APIView):
    """
    Lista todos los tipos de productos y permite crear uno nuevo.
    """
    def get(self, request, format=None):
        # Recupera todos los tipos de productos y los serializa
        tipoproductos = TipoProducto.objects.all()
        serializer = TipoProductoSerializer(tipoproductos, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        # Crea un nuevo tipo de producto a partir de los datos proporcionados
        serializer = TipoProductoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Clase para manejar operaciones CRUD de un tipo de producto específico
class TipoProductoDetail(APIView):
    """
    Obtiene, actualiza o elimina un tipo de producto por su ID (pk).
    """
    def get_object(self, pk):
        try:
            # Recupera el tipo de producto por su clave primaria (pk)
            return TipoProducto.objects.get(pk=pk)
        except TipoProducto.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        # Serializa y devuelve un tipo de producto específico
        tipoproducto = self.get_object(pk)
        serializer = TipoProductoSerializer(tipoproducto)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        # Actualiza un tipo de producto completo
        tipoproducto = self.get_object(pk)
        serializer = TipoProductoSerializer(tipoproducto, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        # Actualiza parcialmente un tipo de producto
        tipoproducto = self.get_object(pk)
        serializer = TipoProductoSerializer(tipoproducto, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        # Elimina un tipo de producto
        tipoproducto = self.get_object(pk)
        tipoproducto.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Vista basada en función para realizar consultas personalizadas sobre productos
@api_view(['GET'])
def get_productos_with_tipoproductos(request):
    # Comentarios previos que describen parámetros opcionales o de consulta en el request:
    # Estos son ejemplos de cómo podrías manejar datos del body o parámetros de consulta:
    # user_id = request.data.get('id')  # ID del usuario (si se envía en el cuerpo del request)
    # resource_path = request.data.get('resourcePath')  # Ruta del recurso solicitado
    # resource_method = request.data.get('resourceMethod')  # Método HTTP (GET, POST, etc.)
    # cantidad_min = request.query_params.get('cantidad_min', 10)  # Parámetro opcional en la URL
    # tipo_nombre = request.query_params.get('tipo_nombre', 'Electrónica')  # Nombre del tipo (opcional)
    
    """
    ***************** Productos Generales *********************
    Recuperamos todos los productos registrados en la base de datos.
    """
    productos = Producto.objects.all()
    # Serializamos los datos en formato JSON.
    serializer = ProductoSerializer(productos, many=True)
    """
    **********************************************************
    """

    """
    ***************** Productos con Condiciones Básicas - Consulta 1 *********************
    Filtro de productos según condiciones específicas: cantidad igual a 36 y marca contiene "Oneal-Parker".
    """
    # productos = Producto.objects.filter(
    #     Q(cantidad=36) &
    #     Q(marca__icontains="Oneal-Parker")
    # )
    # serializer = ProductoSerializer(productos, many=True)
    """
    **********************************************************
    """

    """
    ***************** Productos con Condiciones Básicas usando Parámetros del Body *********************
    Permite filtrar productos dinámicamente basándose en los parámetros enviados en el cuerpo del request.
    """
    # cantidad = request.data.get('cantidad', None)
    # marca = request.data.get('marca', None)
    # consulta = Q()
    # if cantidad is not None:
    #     consulta &= Q(cantidad__gte=cantidad)  # Productos con cantidad mayor o igual a `cantidad`.
    # if marca:
    #     consulta &= Q(marca__icontains=marca)  # Marca contiene el texto proporcionado.
    # productos = Producto.objects.filter(consulta)
    # serializer = ProductoSerializer(productos, many=True)
    """
    **********************************************************
    """

    """
    ***************** Productos con Condiciones Complejas *********************
    Productos filtrados con varias condiciones combinadas (AND, OR).
    """
    # productos = Producto.objects.filter(
    #     Q(cantidad__lte=85) & 
    #     Q(cantidad__gte=50) |
    #     (Q(precio__gte=1000) & Q(precio__lte=5000))
    # )
    # serializer = ProductoSerializer(productos, many=True)
    """
    **********************************************************
    """

    """
    ***************** Productos con Condiciones de Texto *********************
    Filtra productos que cumplen condiciones relacionadas con campos de texto.
    """
    # productos = Producto.objects.filter(
    #     Q(cantidad__lte=85) &
    #     Q(nombre__icontains="smartphone") |  # Nombre contiene "smartphone".
    #     Q(marca__endswith="Pro")  # Marca termina en "Pro".
    # )
    # serializer = ProductoSerializer(productos, many=True)
    """
    **********************************************************
    """

    """
    ***************** Productos Agrupados por Tipo *********************
    Agrupamos productos por tipo y contamos la cantidad en cada grupo.
    """
    # productos = Producto.objects.values('tipoproducto').annotate(total=Count('tipoproducto'))
    # serializer = ProductoAgrupado(productos, many=True)
    """
    **********************************************************
    """

    """
    ***************** Productos Agrupados con Detalles del Tipo *********************
    Agrupa productos incluyendo detalles del tipo y cuenta los productos.
    """
    # productos = Producto.objects.filter(
    #     cantidad__gte=5,
    #     tipoproducto__nombre__icontains="Electrónica"
    # ).values(
    #     'tipoproducto', 'tipoproducto__nombre'
    # ).annotate(
    #     total=Count('id')
    # )
    # serializer = ProductoAgrupadoRelacionado(productos, many=True)
    """
    **********************************************************
    """

    """
    ***************** Productos Relacionados con Cliente y Ventas *********************
    Muestra productos relacionados con clientes, ventas y otros modelos conectados.
    """
    # productos = Cliente.objects.prefetch_related(
    #     'venta_set__ventaproducto_set__producto__tipoproducto'
    # ).all()
    # serializer = ClienteCompletoSerializer(productos, many=True)
    """
    **********************************************************
    """

    """
    ***************** Productos con Totales de Ventas e Ingresos *********************
    Calcula las ventas totales y los ingresos totales por producto.
    """
    productos = Producto.objects.annotate(
        total_ventas=Sum('ventas_producto__cantidad'),
        total_ingresos=Sum('ventas_producto__total')
    )
    for producto in productos:
        print(f"Producto: {producto.nombre}, Ventas: {producto.total_ventas}, Ingresos: {producto.total_ingresos}")
    """
    **********************************************************
    """

    # Devolvemos los datos en formato JSON.
    return Response(serializer.data)
