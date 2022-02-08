from django.contrib.auth.models import AbstractUser
from django.db import models


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
            "first_name": self.first_name,
            "last_name": self.last_name,
            "date": self.date.strftime("%b %d %Y, %I:%M %p")

        }


class Coins(models.Model):
    user = models.ForeignKey(
        "User", on_delete=models.CASCADE, null=False, related_name="user_coins")
    coins = models.DecimalField(default=50.00, max_digits=8, decimal_places=2)


class Calification(models.Model):
    user = models.ForeignKey(
        "User", on_delete=models.CASCADE, null=False, related_name="user_calification")
    calification = models.PositiveIntegerField(default=0)


class Ideas(models.Model):
    user = models.ForeignKey(
        "User", on_delete=models.CASCADE, null=False, related_name="user_ideas")
    idea = models.TextField(blank=True, null=True)


class Group(models.Model):
    name = models.CharField(max_length=100)
    theme = models.CharField(max_length=150)
    description = models.TextField()
    user = models.ForeignKey(
        "User", on_delete=models.CASCADE, null=False, related_name="user_group")
    user_competitor1 = models.ForeignKey(
        "User", on_delete=models.CASCADE, null=False, related_name="user_group_competitor")
    user_competitor2 = models.ForeignKey(
        "User", on_delete=models.CASCADE, null=False, related_name="user_group_competitor2")
    ideas = models.ManyToManyField(Ideas)


class Invitation(models.Model):
    invitation1 = models.BooleanField(default=False)
    invitation2 = models.BooleanField(default=False)
    group = models.ForeignKey(
        "Group", on_delete=models.CASCADE, null=False, related_name="invitation_group")


class RegisterGroup(models.Model):
    group = models.ForeignKey(
        "Group", on_delete=models.CASCADE, null=False, related_name="register_group")
