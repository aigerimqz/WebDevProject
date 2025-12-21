from rest_framework import serializers
from .models import Cinema, Movies, Screening, Booking
from django.contrib.auth.models import User
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Booking, Screening, Movies, Cinema

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













class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ["username", "email", "password", "password2"]

    def create(self, validated_data):
        validated_data.pop("password2")
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )
        return user




class BookingDetailSerializer(serializers.ModelSerializer):
    movie_title = serializers.CharField(source='screening.movie.title', read_only=True)
    movie_image = serializers.CharField(source='screening.movie.image_url', read_only=True)
    cinema_name = serializers.CharField(source='screening.cinema.name', read_only=True)
    screening_date = serializers.DateField(source='screening.date', read_only=True)
    screening_time = serializers.TimeField(source='screening.time', read_only=True)
    price = serializers.DecimalField(source='screening.price', max_digits=6, decimal_places=2, read_only=True)

    class Meta:
        model = Booking
        fields = ['id', 'seat_row', 'seat_number', 'created_at', 'is_paid',
                  'movie_title', 'movie_image', 'cinema_name', 'screening_date', 'screening_time', 'price']

# class ProfileSerializer(serializers.ModelSerializer):
#     bookings = BookingDetailSerializer(source='booking_set', many=True)

#     class Meta:
#         model = User
#         fields = ['id', 'username', 'email', 'bookings']

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(source='profile.avatar', required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'avatar']

    def update(self, instance, validated_data):
        # обновляем User
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.save()

        # обновляем Profile.avatar
        profile_data = validated_data.get('profile', {})
        if profile_data:
            profile, _ = Profile.objects.get_or_create(user=instance)
            avatar = profile_data.get('avatar')
            if avatar:
                profile.avatar = avatar
                profile.save()

        return instance