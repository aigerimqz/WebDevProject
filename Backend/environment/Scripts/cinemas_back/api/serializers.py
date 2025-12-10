from rest_framework import serializers
from .models import Cinema, Movies, Screening, Booking
from django.contrib.auth.models import User
from django.contrib.auth.models import User
from rest_framework import serializers

class CinemaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cinema
        fields = '__all__'

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movies
        fields = '__all__'

class ScreeningSerializer(serializers.ModelSerializer):
    movie = MovieSerializer()
    cinema = CinemaSerializer()
    class Meta:
        model = Screening
        fields = ['id', 'movie', 'cinema', 'date', 'time', 'price']


class BookingSerializer(serializers.Serializer):
    screening = serializers.PrimaryKeyRelatedField(queryset=Screening.objects.all())
    seat_row = serializers.IntegerField()
    seat_number = serializers.IntegerField()
    created_at = serializers.DateTimeField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    is_paid = serializers.BooleanField(default=False)

    def validate(self, data):
        screening = data['screening']
        seat_row = data['seat_row']
        seat_number = data['seat_number']

        if Booking.objects.filter(
            screening=screening,
            seat_row=seat_row,
            seat_number=seat_number
        ).exists():
            raise serializers.ValidationError("This place already booked.")

        return data

    def create(self, validated_data):
        return Booking.objects.create(**validated_data)











from rest_framework import serializers
from django.contrib.auth.models import User

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ["username", "email", "password", "password2"]

    def create(self, validated_data):
        validated_data.pop("password2")  # оставляем, если форма всё ещё отправляет password2
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )
        return user
