from django.db import models

# Create your models here.

LOCATION_CHOICES = (
    ('halifax', 'HALIFAX'),
    ('sydney', 'SYDNEY'),
    ('antigonish', 'ANTIGONISH'),
    ('moncton', 'MONCTON'),
    ('truro', 'TRURO'),
    
)

class Ride(models.Model):
    source = models.CharField(max_length=15, choices=LOCATION_CHOICES)
    destination = models.CharField(max_length=15, choices=LOCATION_CHOICES)
    date = models.DateField()
    time = models.TimeField()
    phone = models.CharField(max_length=12)
    name = models.CharField(max_length=25)

    def _str_(self):
        return self.name + " " + self.source + " " + self.destination