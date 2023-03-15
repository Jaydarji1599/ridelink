from django.shortcuts import render
from .serializers import UserSerializer, UpdateUserSerializer, PassengerSerializer, RideSerializer, ReviewSerializer
from django.contrib.auth.models import User    
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication
from .models import Passenger, Ride, Review
from rest_framework import viewsets, generics
from rest_framework.response import Response


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


class ReviewView(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()