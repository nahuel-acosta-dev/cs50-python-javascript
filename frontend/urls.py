from django.urls import path
from django.urls import re_path
from . import views

app_name = 'frontend'

urlpatterns = [
    path("",  views.index),
    path("login",  views.index),
    path("register", views.index),
    path("logout", views.index),
    path("invitation", views.index),

    # Practicas
    path("group-invitation", views.index),
    path("room", views.index),
    path("newroom", views.index),
    path("newroom/invitate", views.index),
    path("newroom/create", views.index),
    path("notification", views.index)
]
