from django.urls import path
# from .views import CinemaListCreateView, CinemaDetailView, MovieListCreateView
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('cinema/', CinemaListCreateView.as_view()),
    path('cinema/<int:pk>/', CinemaDetailView.as_view()),
    path('movies/', MovieListView.as_view()),
    path('movies/<int:pk>', MovieDetailView.as_view()),
    path('screening/', ScreeningListCreateView.as_view()),
    path('screening/<int:pk>/', ScreeningDetailView.as_view()),
    path('booking/', create_booking, name='create-booking'),
    path('booking/my/', my_bookings, name='my-bookings'),
    # path('check_auth/', check_auth, name='check_auth'),
]