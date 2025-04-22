from django.urls import path
# from .views import CinemaListCreateView, CinemaDetailView, MovieListCreateView
from .views import *

urlpatterns = [
    path('cinema/', CinemaListCreateView.as_view()),
    path('cinema/<int:pk>/', CinemaDetailView.as_view()),
    path('movies/', MovieListCreateView),
    path('screening/', ScreeningListCreateView.as_view()),
    path('screening/<int:pk>/', ScreeningDetailView.as_view()),
]