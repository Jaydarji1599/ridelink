# Import necessary Django modules
from django.contrib import admin
from .models import Ride, Passenger, Review, Contact

# Create custom admin classes to display specific fields in the Django admin panel

# Ride list admin view
class RidelistAdmin(admin.ModelAdmin):
    # Specify the fields to display in the admin view for Ride model
    list_display = ('name', 'source', 'destination', 'number')

# Passenger admin view
class PassengerAdmin(admin.ModelAdmin):
    # Specify the fields to display in the admin view for Passenger model
    list_display = ('id', 'user', 'ride')

# Review admin view
class ReviewAdmin(admin.ModelAdmin):
    # Specify the fields to display in the admin view for Review model
    list_display = ('driver', 'reviewer', 'score', 'comment')

# Contact admin view
class ContactAdmin(admin.ModelAdmin):
    # Specify the fields to display in the admin view for Contact model
    list_display = ('id', 'user', 'contact')

# Register the models with their respective custom admin classes
admin.site.register(Ride, RidelistAdmin)
admin.site.register(Passenger, PassengerAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(Contact, ContactAdmin)
