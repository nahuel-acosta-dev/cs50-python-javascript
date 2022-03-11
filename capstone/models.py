from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import Q


class User(AbstractUser):
    date = models.DateTimeField(auto_now_add=True)
    groups_create = models.PositiveIntegerField(default=0)
    groups_joined = models.PositiveIntegerField(default=0)
    state = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.username}"

    def serialize(self):
        return{
            "id": self.id,
            "username": self.username,
            'groups_create': self.groups_create,
            'groups_joined': self.groups_joined,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "date": self.date.strftime("%b %d %Y, %I:%M %p")
        }


class Coins(models.Model):
    user = models.ForeignKey(
        "User", on_delete=models.CASCADE, null=False, related_name="user_coins")
    price = models.DecimalField(default=10.00, max_digits=8, decimal_places=2)
    coins = models.DecimalField(default=50.00, max_digits=8, decimal_places=2)


class Calification(models.Model):
    user = models.ForeignKey(
        "User", on_delete=models.CASCADE, null=False, related_name="user_calification")
    calification = models.PositiveIntegerField(default=0)


class Ideas(models.Model):
    user = models.ForeignKey(
        "User", on_delete=models.CASCADE, null=False, related_name="user_ideas")
    idea = models.TextField(blank=True, null=True)


class GroupDetails(models.Model):
    user = models.ForeignKey(
        "User", on_delete=models.CASCADE, null=False, related_name="group_user")
    name = models.CharField(max_length=100)
    theme = models.CharField(max_length=150)
    description = models.TextField()
    invitation1 = models.BooleanField(default=False)
    user1 = models.ForeignKey(
        "User", on_delete=models.CASCADE, null=True, default=None, blank=True, related_name="invitation_user1")
    invitation2 = models.BooleanField(default=False)
    user2 = models.ForeignKey(
        "User", on_delete=models.CASCADE, null=True, default=None, blank=True, related_name="invitation_user2")
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.user_id}"

    def serialize(self):
        return{
            "id": self.id,
            "user": self.user_id,
            "name": self.name,
            "theme": self.theme,
            "description": self.description,
            "active": self.active
        }


class Group(models.Model):
    user = models.ForeignKey(
        "User", on_delete=models.CASCADE, null=False, related_name="user_group")
    user_competitor1 = models.ForeignKey(
        "User", on_delete=models.CASCADE, null=False, related_name="user_group_competitor")
    user_competitor2 = models.ForeignKey(
        "User", on_delete=models.CASCADE, null=False, related_name="user_group_competitor2")
    ideas = models.ManyToManyField(Ideas)
    active = models.BooleanField(default=True)


class RegisterGroup(models.Model):
    group = models.ForeignKey(
        "Group", on_delete=models.CASCADE, null=False, related_name="register_group")


class Notification(models.Model):
    username = models.CharField(max_length=255)
    room = models.CharField(max_length=255)
    content = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def serialize(self):
        return{
            "content": self.content,
        }


class Message(models.Model):
    username = models.CharField(max_length=255)
    room = models.CharField(max_length=255)
    content = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def serialize(self):
        return{
            "content": self.content,
        }

    # clone Whatsap


class ChatModel(models.Model):
    model = models.CharField(max_length=100, default=None)
    title = models.CharField(max_length=100, default=None)
    theme = models.CharField(max_length=100, default=None)
    description = models.CharField(max_length=500, default=None)
    sender = models.CharField(max_length=100, default=None)
    response = models.TextField(null=True, blank=True)
    thread_name = models.CharField(null=True, blank=True, max_length=50)
    timestamp = models.DateTimeField(auto_now_add=True)

    def serialize(self):
        return{
            'model': self.model,
            'title': self.title,
            'theme': self.theme,
            'description': self.description,
            'sender': self.sender,
            'response': self.response,
            'thread_name': self.thread_name,
            'timestamp': self.timestamp
        }

    def __str__(self) -> str:
        return self.response
