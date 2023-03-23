from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from phonenumber_field.modelfields import PhoneNumberField 

class Ride(models.Model):
    source = models.CharField(max_length=15)
    destination = models.CharField(max_length=15)
    date = models.DateField()
    time = models.TimeField()
    driver = models.ForeignKey(User, on_delete=models.CASCADE, default=None)

    def __str__(self):
        return str(self.driver.first_name) + " " + self.source + " " + self.destination



class Passenger(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_id")
    ride = models.ForeignKey(Ride, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username


class Review(models.Model):
    driver = models.ForeignKey(User, on_delete=models.CASCADE, related_name="driver_id")
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reviewer_id")
    score = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)])

    def __str__(self):
        return f"{self.reviewer.username} reviewed {self.driver.username} with a score of {self.score}"

    
class Contact(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    phone = PhoneNumberField()

    def __str__(self):
        return f"{self.user}: {self.phone}"