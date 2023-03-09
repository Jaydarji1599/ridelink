from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator


# Create your models here.
class Ride(models.Model):
    source = models.CharField(max_length=15)
    destination = models.CharField(max_length=15)
    date = models.DateField()
    time = models.TimeField()
    phone = models.CharField(max_length=12)
    name = models.CharField(max_length=25)
    userId = models.IntegerField()
    Seats = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(4)], default=1)

    def _str_(self):
        return self.name + " " + self.source + " " + self.destination