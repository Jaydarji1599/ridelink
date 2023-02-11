from django.shortcuts import render
from .serializers import RideSerializer 
from rest_framework import viewsets      
from .models import Ride                 


class RideView(viewsets.ModelViewSet):  
    serializer_class = RideSerializer   
    queryset = Ride.objects.all() 
