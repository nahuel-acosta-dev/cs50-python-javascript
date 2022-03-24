from rest_framework.serializers import ModelSerializer
from rest_framework import serializers, validators
from .models import Coins, User, GroupDetails


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username']


class CoinsSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Coins
        fields = '__all__'


class GroupDetailsSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = GroupDetails
        fields = '__all__'
