from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
import phonenumbers
from phonenumbers import NumberParseException
from .utils import generate_phone_confirmation_code, send_phone_confirmation_code
from .models import PhoneVerification

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)
    phone_number = serializers.CharField()
    
    class Meta:
        model = User
        fields = ('email', 'password', 'password_confirmation', 'phone_number')
    
    def validate_phone_number(self, value):
        try:
            parsed_number = phonenumbers.parse(value, None)
        except NumberParseException:
            raise serializers.ValidationError('Invalid phone number')
        if not phonenumbers.is_valid_number(parsed_number):
            raise serializers.ValidationError('Invalid phone number')
        return value
    
    def validate(self, data):
        if data['password'] != data.pop('password_confirmation'):
            raise serializers.ValidationError('Passwords do not match')
        return data
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        phone_number = validated_data.pop('phone_number')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        code = generate_phone_confirmation_code()
        send_phone_confirmation_code(phone_number, code)
        return user


class PhoneVerificationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = PhoneVerification
        fields = ('user', 'code', 'confirmed')

    def validate_code(self, value):
        user = self.context['user']
        phone_verification = PhoneVerification.objects.filter(user=user).order_by('-created_at').first()
        if not phone_verification:
            raise serializers.ValidationError('Phone number not found')
        if phone_verification.code != value:
            raise serializers.ValidationError('Invalid verification code')
        return value
    
    def update(self, instance, validated_data):
        instance.confirmed = True
        instance.save()
        user = instance.user
        user.phone_number_confirmed = True
        user.save()
        return instance