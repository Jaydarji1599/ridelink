from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator


class Ride(models.Model):
    source = models.CharField(max_length=15)
    destination = models.CharField(max_length=15)
    date = models.DateField()
    time = models.TimeField()
    phone = models.CharField(max_length=12)
    driver = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    seats = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(4)], default=1)
    visible = models.BooleanField(default=True)

    def __str__(self):
        return str(self.driver.first_name) + " " + self.source + " " + self.destination

    def update_visible(self):
        if self.passenger_set.count() >= self.Seats:
            self.visible = False
            self.save()


class Passenger(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ride = models.ForeignKey(Ride, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username


class Review(models.Model):
    driver = models.ForeignKey(User, on_delete=models.CASCADE, related_name="driver_id")
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reviewer_id")
    score = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)])
    comment = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.reviewer.username} reviewed {self.driver.username} with a score of {self.score}"

    

