from django.contrib import admin
from .models import User, Posts, Following, Like
# Register your models here.


class PostsAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "activate")


class FollowingAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "user_following", "activate")


class LikeAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "posts", "activate")


admin.site.register(User)
admin.site.register(Posts, PostsAdmin)
admin.site.register(Following, FollowingAdmin)
admin.site.register(Like, LikeAdmin)
