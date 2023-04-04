# Import necessary Django REST framework modules
from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer

# Register API View
class RegisterAPI(generics.GenericAPIView):
    # Use the RegisterSerializer for handling data
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        # Deserialize the incoming data using the serializer
        serializer = self.get_serializer(data=request.data)
        # Validate the data and raise an exception if invalid
        serializer.is_valid(raise_exception=True)
        # Save the validated data as a new user
        user = serializer.save()
        # Return a response containing the user data and a token
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

# Login API View
class LoginAPI(generics.GenericAPIView):
    # Use the LoginSerializer for handling data
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        # Deserialize the incoming data using the serializer
        serializer = self.get_serializer(data=request.data)
        # Validate the data and raise an exception if invalid
        serializer.is_valid(raise_exception=True)
        # Get the validated user data
        user = serializer.validated_data
        # Create a token for the user
        _, token = AuthToken.objects.create(user)
        # Return a response containing the user data and the token
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        })

# Get User API View
class UserAPI(generics.RetrieveAPIView):
    # Set permission class to allow only authenticated users
    permission_classes = [permissions.IsAuthenticated]
    # Use the UserSerializer for handling data
    serializer_class = UserSerializer

    def get_object(self):
        # Retrieve the authenticated user from the request
        return self.request.user
