from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from .views import UserCreateView, LoginView

urlpatterns = [
    path('', LoginView.as_view(), name='login'),
    path('signup/', UserCreateView.as_view(), name='signup'),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
]
