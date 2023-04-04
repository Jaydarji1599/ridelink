from django.shortcuts import render, get_object_or_404
from .serializers import UserSerializer, UpdateUserSerializer, PassengerSerializer, RideSerializer, ReviewSerializer, ContactSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication
from .models import Passenger, Ride, Review, Contact
from rest_framework import viewsets, generics
from rest_framework.response import Response
from django.db.models import F

# UserView to handle retrieving and filtering User instances
class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        # Filter users based on query parameters (username or email)
        username = self.request.query_params.get('username', None)
        email = self.request.query_params.get('email', None)

        if username is not None:
            queryset = self.queryset.filter(username=username)
            return queryset
        if email is not None:
            queryset = self.queryset.filter(email=email)
            return queryset
        
        return super().get_queryset()

# UpdateProfileView to handle updating user profiles
class UpdateProfileView(generics.UpdateAPIView):
    model = User
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = UpdateUserSerializer

# PassengerView to handle Passenger model instances
class PassengerView(viewsets.ModelViewSet):
    serializer_class = PassengerSerializer
    queryset = Passenger.objects.all()

    def get_queryset(self):
        # Filter passengers based on the ride query parameter
        ride = self.request.query_params.get('ride')
        if ride is not None:
            queryset = Passenger.objects.filter(ride=ride).all()
            return queryset
        return super().get_queryset()

# RideView to handle Ride model instances
class RideView(viewsets.ModelViewSet):
    serializer_class = RideSerializer
    queryset = Ride.objects.all()

# ReviewView to handle Review model instances
class ReviewView(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()

# ContactView to handle Contact model instances
class ContactView(viewsets.ModelViewSet):
    serializer_class = ContactSerializer
    queryset = Contact.objects.all()
