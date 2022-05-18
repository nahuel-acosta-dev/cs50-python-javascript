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
    path("user", views.myUser),

    # general
    path('coins', views.getCoins),
    path("allcoins", views.getAllCoins, name="allcoins"),
    path("allusers", views.allUsers, name="allusers"),
    path("allinvitations", views.getInvitations, name="allinvitations"),

    path("group/create_group_details", views.createGroupDetails),
    path("group/get_group_details", views.getGroupDetails),
    path("group/get_id_Group_Details/<int:id>", views.getIdGroupDetails),
    path("group/mod_group_details/<int:id>", views.modGroupDetails),
    path("group/delete_user_group_details/<int:id>",
         views.deleteUserGroupDetails),
    path("group/desactive_group_details/<int:id>",
         views.desactiveGroupDetails),


    path("group/delete_group_details/<int:id>", views.deleteGroupDetails),
    path('messages/<str:room_name>', views.getMessages, name="getMessages")


]
