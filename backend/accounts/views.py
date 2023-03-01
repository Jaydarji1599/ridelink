from django.shortcuts import render
from .serializers import UserSerializer 
from rest_framework import viewsets      
from django.contrib.auth.models import User    


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()