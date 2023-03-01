from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Ride(models.Model):
    source = models.CharField(max_length=15)
    destination = models.CharField(max_length=15)
    date = models.DateField()
    time = models.TimeField()
    phone = models.CharField(max_length=12)
    name = models.CharField(max_length=25)
    userId = models.IntegerField()

    def _str_(self):
        return self.name + " " + self.source + " " + self.destination