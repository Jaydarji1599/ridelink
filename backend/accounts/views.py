from django.contrib.auth import login

from rest_framework import permissions
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from rest_framework import serializers

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .models import User
from .serializers import UserSerializer, PhoneVerificationSerializer

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

# pythonCopy code

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from .serializers import PhoneVerificationSerializer
from .models import PhoneVerification
from .utils import send_verification_code

class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginAPI, self).post(request, format=None)


User = get_user_model()
class PhoneVerificationView(APIView):
    def post(self, request, format=None):
        serializer = PhoneVerificationSerializer(data=request.data, context={'user':
        request.user})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PhoneVerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhoneVerification
        fields = ('user', 'code', 'confirmed')
    
    def validate(self, data):
        user = self.context['user']
        if user.phone_number_confirmed:
            raise serializers.ValidationError('Phone number already confirmed')
        phone_number = user.phone_number
        if not phone_number:
            raise serializers.ValidationError('Phone number not found')
        phone_verification = PhoneVerification(user=user, code=generate_verification_code())
        phone_verification.save()
        send_verification_code(phone_number, phone_verification.code)
        return data

class UserCreateView(generics.CreateAPIView):
    serializer_class = UserSerializer
    
    def create(self, request, *args, **kwargs):
        # Validate phone number confirmation code
        phone_verification_serializer = PhoneVerificationSerializer(data=request.data)
        phone_verification_serializer.is_valid(raise_exception=True)
        # Create user object
        user_serializer = self.get_serializer(data=request.data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()
        # Create auth token
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'user_id': user.id,
            'email': user.email,
            'phone_number': user.phone_number.as_e164,
            'token': token.key,
        }, status=status.HTTP_201_CREATED)


class LoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
        context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'user_id': user.id,
            'email': user.email,
            'phone_number': user.phone_number.as_e164,
            'token': token.key
        })