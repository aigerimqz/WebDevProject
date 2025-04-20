from django.urls import path
from .views import CinemaListCreateView, CinemaDetailView

urlpatterns = [
    path('cinema/', CinemaListCreateView.as_view()),
    path('cinema/<int:pk>/', CinemaDetailView.as_view()),
]