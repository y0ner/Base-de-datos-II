from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Patrocinador, Proyecto
from .serializers import PatrocinadorSerializer, ProyectoSerializer

# Patrocinador views
@api_view(['GET', 'POST'])
def patrocinador_list(request):
    if request.method == 'GET':
        patrocinadores = Patrocinador.objects.all()
        serializer = PatrocinadorSerializer(patrocinadores, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PatrocinadorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def patrocinador_detail(request, pk):
    try:
        patrocinador = Patrocinador.objects.get(pk=pk)
    except Patrocinador.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PatrocinadorSerializer(patrocinador)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = PatrocinadorSerializer(patrocinador, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        patrocinador.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Proyecto views
@api_view(['GET', 'POST'])
def proyecto_list(request):
    if request.method == 'GET':
        proyectos = Proyecto.objects.all()
        serializer = ProyectoSerializer(proyectos, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ProyectoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def proyecto_detail(request, pk):
    try:
        proyecto = Proyecto.objects.get(pk=pk)
    except Proyecto.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProyectoSerializer(proyecto)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ProyectoSerializer(proyecto, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        proyecto.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
