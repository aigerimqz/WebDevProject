from django.db import models

class Cinema(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=255)
    

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
    movie = models.ForeignKey('Movies', on_delete=models.CASCADE)
    cinema = models.ForeignKey('Cinema', on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    price = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return f"{self.movie.title} at {self.cinema.name} on {self.date} {self.time}"
