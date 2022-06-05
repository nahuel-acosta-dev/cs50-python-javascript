from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("/<str:product_title>/<int:product_id>", views.product, name="product"),
    path("/<str:product_title>/add_product", views.add_product, name="add_product"),
    path("/<str:product_title>/<int:product_id>/delete_product", views.delete_product, name="delete_product"),
    path("/<str:product_title>/add_comment", views.add_comment, name="add_comment"),
    path("/<str:product_title>/delete_comment", views.delete_comment, name="delete_comment"),
    path("login", views.login_view, name="login"),
    path("create_listing", views.create_listing, name="create_listing"),
    path("new_ofer/<int:product_id>", views.new_ofert, name="new_ofert"),
    path("activate_listing/<int:product_id>", views.activate_listing, name="activate_listing"),
    path("desactivate_listing/<int:product_id>", views.desactivate_listing, name="desactivate_listing"),
    path("my_listings", views.my_listings, name="my_listings"),
    path("my_buy", views.my_buy, name="my_buy"),
    path("watchlist", views.watchlist, name="watchlist"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("categories", views.category, name="category"),
    path("categories/<str:category_type>", views.filter, name="filter")
]
