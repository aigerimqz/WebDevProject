from django.urls import path
from .views import CinemaListCreateView, CinemaDetailView, MovieListCreateView

urlpatterns = [
    path('cinema/', CinemaListCreateView.as_view()),
    path('cinema/<int:pk>/', CinemaDetailView.as_view()),
    path('movies/', MovieListCreateView.as_view()),
]