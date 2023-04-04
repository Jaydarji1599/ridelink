from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from phonenumber_field.modelfields import PhoneNumberField

# Ride model
class Ride(models.Model):
    source = models.CharField(max_length=15)  # Source location of the ride
    destination = models.CharField(max_length=15)  # Destination location of the ride
    date = models.DateField()  # Date of the ride
    time = models.TimeField()  # Time of the ride
    driver = models.ForeignKey(User, on_delete=models.CASCADE, default=None)  # Driver of the ride, a User instance

    def __str__(self):
        return str(self.driver.first_name) + " " + self.source + " " + self.destination

# Passenger model
class Passenger(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_id")  # User instance who is a passenger
    ride = models.ForeignKey(Ride, on_delete=models.CASCADE)  # Ride instance the passenger is part of

    def __str__(self):
        return self.user.username

# Review model
class Review(models.Model):
    driver = models.ForeignKey(User, on_delete=models.CASCADE, related_name="driver_id")  # Driver being reviewed, a User instance
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reviewer_id")  # Reviewer, a User instance
    score = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)])  # Review score (0-5)

    def __str__(self):
        return f"{self.reviewer.username} reviewed {self.driver.username} with a score of {self.score}"

# Contact model
class Contact(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)  # User instance for the contact
    phone = PhoneNumberField()  # Phone number of the user

    def __str__(self):
        return f"{self.user}: {self.phone}"
