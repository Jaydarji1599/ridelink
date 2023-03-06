from knox import views as knox_views
from accounts.api import LoginAPI, RegisterAPI, UserAPI
from django.urls import path
from .views import UpdateProfileView

urlpatterns = [
    path('login/', LoginAPI.as_view(), name='login'),
    path('logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('register/', RegisterAPI.as_view(), name="register"),
    path('user/', UserAPI.as_view(), name="user"),
    path('update/<int:pk>/', UpdateProfileView.as_view(), name="update")
]
