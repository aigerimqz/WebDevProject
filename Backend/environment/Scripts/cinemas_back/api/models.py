from django.db import models

class Cinema(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Movies(models.Model):
    #id = models.IntegerField()
    title = models.CharField(max_length=255)
    description = models.TextField()
    genre = models.CharField(max_length=255)
    release_year = models.IntegerField()
    release_date = models.IntegerField()
    duration = models.PositiveIntegerField()
    image_url = models.URLField(blank=True)

    def __str__(self):
        return self.name
    
class Screening(models.Model):
    movieId = models.IntegerField()
    cinemaId = models.IntegerField()
    date = models.DateField()
    time = models.TimeField()
    price = models.IntegerField()

    def __str__(self):
        return f"{self.movie.title} at {self.datetime} in {self.cinema.name}"
