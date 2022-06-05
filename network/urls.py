
from django.urls import path
from django.urls import re_path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    # API Routes
    path("api", views.api, name="api"),
    path("api/<str:api>", views.open_user_api, name="open_user_api"),
    path("api/create/<str:api>", views.create, name="create"),
    path("api/<str:api>/<int:id>", views.open_single_api, name="open_single_api"),
    path("api/<str:api>/user/<int:user_id>/all",
         views.open_select_user_api_all, name="open_select_user_api_all"),
    path("api/<str:api>/user/<int:object_id>",
         views.open_api_user_object, name="open_api_user_object"),
    path("api/<str:api>/<str:element>/<int:object_id>",
         views.open_api_object, name="open_api_object"),
    path("api/<str:api>/all", views.open_api, name="open_api")
]
