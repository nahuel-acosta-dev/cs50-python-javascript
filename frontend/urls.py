from django.urls import path
from django.urls import re_path
from . import views

app_name = 'frontend'

urlpatterns = [
    path("quickideas",  views.index),
    path("",  views.index),
    path("login",  views.index),
    path("register", views.index),
    path("logout", views.index),

    # Generals
    path("invitation", views.index),
    path('invitation/invitate', views.index),
    path("invitation/create", views.index),
    path('receive-invitations', views.index),
    path('receive-invitations/loading-users', views.index),
    path('invitation/pre_room', views.index),
    #path('private_room/room', views.index),
    path('private_room/<str:room>/<str:myuser>/<str:id>', views.index),

    # Practicas
    path("group-invitation", views.index),
    path("room", views.index),
    path("notification", views.index)
]
