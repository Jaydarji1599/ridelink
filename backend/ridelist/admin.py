from django.contrib import admin
from .models import Ride


# Register your models here.
class RidelistAdmin(admin.ModelAdmin):
    list = ('name', 'source', 'destination', 'number')


admin.site.register(Ride, RidelistAdmin)
