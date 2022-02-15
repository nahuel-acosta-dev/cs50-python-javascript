from django.urls import path
from django.urls import re_path
from . import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    # API Routes
    # sesion
    path("", views.getRoutes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('coins', views.getCoins),

    path("register", views.register, name="register"),
    path("allusers", views.allUsers, name="allusers"),

]
