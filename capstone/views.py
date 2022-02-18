from django.shortcuts import render
import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken


from .serializers import CoinsSerializer
from .models import User, Coins


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/capstone_api/token',
        '/capstone_api/token/refresh'
    ]

    return Response(routes)


"""@api_view(['POST'])
def createUser(request):
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    user = serializer.save()
    refresh = RefreshToken.for_user(user)
    return{
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }, Response({
        'user_info': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
        },
        'token': refresh.access_token
    })"""


@api_view(['POST'])
def createUser(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return Response({"message": "Passwords must match."})

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return Response({"message": "Username already taken."})
        return Response({'user_info': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
        }})
    else:
        return Response({"message": "usage method post"}, status=400)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCoins(request):
    user = request.user
    print(user.id)
    #coins = Coins.objects.all()
    coins = Coins.objects.filter(user_id=user.id)
    serializer = CoinsSerializer(coins, many=True)
    return Response(serializer.data)


def allUsers(request):
    objecto = User.objects.all()
    if request.method == 'GET':
        objecto = objecto.order_by("-date").all()
        return JsonResponse([objec.serialize() for objec in objecto], safe=False)
