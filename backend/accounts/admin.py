from django.contrib import admin
from .models import Ride, Passenger, Review, Contact


# Register your models here.
class RidelistAdmin(admin.ModelAdmin):
    list = ('name', 'source', 'destination', 'number')
class PassengerAdmin(admin.ModelAdmin):
    list = ('id', 'user', 'ride')
class ReviewAdmin(admin.ModelAdmin):
    list = ('driver', 'reviewer', 'score', 'comment')
class ContactAdmin(admin.ModelAdmin):
    list = ('id', 'user', 'contact')

admin.site.register(Ride, RidelistAdmin)
admin.site.register(Passenger, PassengerAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(Contact, ContactAdmin)

