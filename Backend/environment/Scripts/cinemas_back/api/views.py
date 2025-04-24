from rest_framework import generics, status
from .models import Cinema, Movies, Screening, Booking
from .serializers import CinemaSerializer, MovieSerializer, ScreeningSerializer, BookingSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

class CinemaListCreateView(generics.ListCreateAPIView):
    queryset = Cinema.objects.all()
    serializer_class = CinemaSerializer

class CinemaDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cinema.objects.all()
    serializer_class = CinemaSerializer

class MovieListView(generics.ListCreateAPIView):
    queryset = Movies.objects.all()
    serializer_class = MovieSerializer

class MovieDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Movies.objects.all()
    serializer_class = MovieSerializer

# @api_view(['GET', 'POST'])
# def MovieListCreateView(request):
#     if request.method == 'GET':
#         movies = Movies.objects.all()
#         serializer = MovieSerializer(movies, many=True)
#         return Response(serializer.data)
#     elif request.method == 'POST':
#         serializer = MovieSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=201)
#         return Response(status=status.HTTP_400_BAD_REQUEST)
    

class ScreeningListCreateView(generics.ListCreateAPIView):
    queryset = Screening.objects.all()
    serializer_class = ScreeningSerializer
class ScreeningDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Screening.objects.all()
    serializer_class = ScreeningSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_booking(request):
    data = request.data.copy()
    data['user'] = request.user.id

    serializer = BookingSerializer(data=data)
    if serializer.is_valid():
        booking = serializer.save(user=request.user)
        return Response(BookingSerializer(booking).data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_bookings(request):
    bookings = Booking.objects.filter(user=request.user)
    serializer = BookingSerializer(bookings, many=True)
    return Response(serializer.data)



# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def check_auth(request):
#     return Response({"user": request.user.username})
