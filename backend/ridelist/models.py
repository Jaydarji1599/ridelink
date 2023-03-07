from django.db import models

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
    

# Want a passenger model that has 2 fields: Foreign key rideID, Foreign key UserID.

# Also need review model that contains 3 fields: UserID, Rating (int 1->5), description (textfield)

# NEED an api similar to the ride api to access these tables!!!