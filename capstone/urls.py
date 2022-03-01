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
    path("register", views.createUser, name="register"),

    # general
    path('coins', views.getCoins),
    path("allusers", views.allUsers, name="allusers"),
    path('createinvitation', views.createInvitation),
    path('messages/<str:room_name>', views.getMessages, name="getMessages"),
    path('newroom/<str:username>', views.chatPage),
    path('notification', views.createInvitation)

]
