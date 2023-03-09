from django.shortcuts import render
from .serializers import UserSerializer, UpdateUserSerializer, PassengerSerializer, RideSerializer
from rest_framework import viewsets, generics     
from django.contrib.auth.models import User    
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication
from .models import Passenger, Ride 

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class UpdateProfileView(generics.UpdateAPIView):
    model = User
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = UpdateUserSerializer

class PassengerView(viewsets.ModelViewSet):
    serializer_class = PassengerSerializer
    queryset = Passenger.objects.all()                


class RideView(viewsets.ModelViewSet):  
    serializer_class = RideSerializer   
    queryset = Ride.objects.all()

    def perform_update(self, serializer):
        ride = serializer.save()
        ride.update_visible()

