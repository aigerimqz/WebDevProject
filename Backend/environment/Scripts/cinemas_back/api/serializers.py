from rest_framework import serializers
from .models import Cinema, Movies, Screening

class CinemaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cinema
        fields = '__all__'

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movies
        fields = '__all__'

class ScreeningSerializer(serializers.ModelSerializer):
    movieId = serializers.PrimaryKeyRelatedField(source='movies', queryset=Movies.objects.all())
    cinemaId = serializers.PrimaryKeyRelatedField(source='cinema', queryset=Cinema.objects.all())
    class Meta:
        model = Screening
        fields = ['id', 'movieId', 'cinemaId', 'date', 'time', 'price']