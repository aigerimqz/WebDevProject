from django.db import models
from django.contrib.auth.models import User

class Cinema(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=255)
    image_url = models.URLField(blank=True)

    def __str__(self):
        return self.name

class Movies(models.Model):
    #id = models.IntegerField()
    title = models.CharField(max_length=255)
    description = models.TextField()
    genre = models.CharField(max_length=255)
    release_year = models.IntegerField()
    release_date = models.DateField()
    duration = models.CharField(max_length=255)
    image_url = models.URLField(blank=True)
    banner = models.URLField(blank=True, null=True)


    def __str__(self):
        return self.title
    
class Screening(models.Model):
    movie = models.ForeignKey('Movies', on_delete=models.CASCADE)
    cinema = models.ForeignKey('Cinema', on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    price = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return f"{self.movie.title} at {self.cinema.name} on {self.date} {self.time}"


class Booking(models.Model):
    screening = models.ForeignKey('Screening', on_delete=models.CASCADE)
    seat_row = models.IntegerField()
    seat_number = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_paid = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.user.username} — Seat {self.seat_row}-{self.seat_number}'
