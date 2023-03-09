from knox import views as knox_views
from accounts.api import LoginAPI, RegisterAPI, UserAPI
<<<<<<< HEAD
from django.urls import path, include
from .views import UpdateProfileView, RideView, UserView
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'ridelist', RideView, 'ridelist')
router.register(r'getuser', UserView, 'getuser')


urlpatterns = [

    # Auth url patterns
    path('auth/login/', LoginAPI.as_view(), name='login'),
    path('auth/logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('auth/register/', RegisterAPI.as_view(), name="register"),
    path('auth/user/', UserAPI.as_view(), name="user"),
    path('auth/update/<int:pk>/', UpdateProfileView.as_view(), name="update"),

    # get data url patterns
    path('/', include(router.urls)),
=======
from django.urls import path
from .views import UpdateProfileView

urlpatterns = [
    path('login/', LoginAPI.as_view(), name='login'),
    path('logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('register/', RegisterAPI.as_view(), name="register"),
    path('user/', UserAPI.as_view(), name="user"),
    path('update/<int:pk>/', UpdateProfileView.as_view(), name="update")
>>>>>>> cb2ec68c786b6e9639d2d5b76fc0ce8ba99eb35e
]

urlpatterns += router.urls
