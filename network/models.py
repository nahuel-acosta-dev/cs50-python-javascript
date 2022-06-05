from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.username}"

    def serialize(self):
        return{
            "id": self.id,
            "username": self.username,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "date": self.date.strftime("%b %d %Y, %I:%M %p")

        }


class Posts(models.Model):
    user = models.ForeignKey(
        "User", on_delete=models.CASCADE, null=False, related_name="user_posts")
    body = models.TextField(blank=True, null=False)
    activate = models.BooleanField(default=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Post {self.id} to {self.user.username}"

    def serialize(self):
        return{
            "id": self.id,
            "user_id": self.user_id,
            "body": self.body,
            "activate": self.activate,
            "date": self.date.strftime("%b %d %Y, %I:%M %p")
        }


class Following(models.Model):
    user = models.ForeignKey(
        "User", on_delete=models.CASCADE, null=False, related_name="user_follow")
    user_following = models.ForeignKey(
        "User", on_delete=models.CASCADE, null=False, related_name="user_following")
    activate = models.BooleanField(default=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Follower {self.id} to {self.user.username}"

    def serialize(self):
        return{
            "id": self.id,
            "user_id": self.user_id,
            "user_following_id": self.user_following_id,
            "activate": self.activate,
            "date": self.date.strftime("%b %d %Y, %I:%M %p")

        }


class Like(models.Model):
    user = models.ForeignKey(
        "User", on_delete=models.CASCADE, null=False, related_name="user_like")
    posts = models.ForeignKey(
        "Posts", on_delete=models.CASCADE, null=False, related_name="like_posts")
    activate = models.BooleanField(default=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Like {self.id} to {self.posts}"

    def serialize(self):
        return{
            "id": self.id,
            "user_id": self.user_id,
            "posts_id": self.posts_id,
            "activate": self.activate,
            "date": self.date.strftime("%b %d %Y, %I:%M %p")
        }
