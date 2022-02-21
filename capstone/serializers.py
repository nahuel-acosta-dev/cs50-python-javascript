from rest_framework.serializers import ModelSerializer
from rest_framework import serializers, validators
from .models import Coins, User


class CoinsSerializer(ModelSerializer):
    class Meta:
        model = Coins
        fields = '__all__'
