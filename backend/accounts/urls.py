from knox import views as knox_views
from accounts.api import LoginAPI, RegisterAPI, UserAPI
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
]

urlpatterns += router.urls
