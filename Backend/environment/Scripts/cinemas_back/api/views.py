from rest_framework import generics, status
from .models import Cinema, Movies
from .serializers import CinemaSerializer, MovieSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view

class CinemaListCreateView(generics.ListCreateAPIView):
    queryset = Cinema.objects.all()
    serializer_class = CinemaSerializer

class CinemaDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cinema.objects.all()
    serializer_class = CinemaSerializer

@api_view(['GET', 'POST'])
def MovieListCreateView(request):
    if request.method == 'GET':
        movies = Movies.objects.all()
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = MovieSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(status=status.HTTP_400_BAD_REQUEST)