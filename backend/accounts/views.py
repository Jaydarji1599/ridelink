from django.shortcuts import render
from .serializers import UserSerializer, UpdateUserSerializer, PassengerSerializer, RideSerializer, ReviewSerializer, ContactSerializer
from django.contrib.auth.models import User    
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication
from .models import Passenger, Ride, Review, Contact
from rest_framework import viewsets, generics
from rest_framework.response import Response
from django.db.models import F


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

    def get_queryset(self):
        ride = self.request.query_params.get('ride')
        queryset = Passenger.objects.all()
        if ride is not None:
            queryset = Passenger.objects.filter(ride=ride).all()
        return queryset     
     


class RideView(viewsets.ModelViewSet):  
    serializer_class = RideSerializer   
    queryset = Ride.objects.all()


class ReviewView(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()

class ContactView(viewsets.ModelViewSet):
    serializer_class = ContactSerializer
    queryset = Contact.objects.all()
