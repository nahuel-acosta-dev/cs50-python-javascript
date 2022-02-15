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
from rest_framework.decorators import api_view, permissions_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

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


@api_view(['GET'])
@permissions_classes
def getCoins(request):
    coins = Coins.objects.all()
    serializer = CoinsSerializer(coins, many=True)
    return Response(serializer.data)


def register(request):
    if request.method == "POST":
        jd = json.loads(request.body)
        username = jd["username"]
        email = jd["email"]

        # Ensure password matches confirmation
        password = jd["password"]
        confirmation = jd["confirmation"]
        if password != confirmation:
            error = {'error': "Passwords must match."}
            return JsonResponse(error)

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            response = {'error': "Username already taken"}
            return JsonResponse(response)
        login(request, user)
        response = {'message': "Register successful"}
        return JsonResponse(response, status=200)
    else:
        error = {'error': "POST request required."}
        return JsonResponse(error, status=400)


def allUsers(request):
    objecto = User.objects.all()
    if request.method == 'GET':
        objecto = objecto.order_by("-date").all()
        return JsonResponse([objec.serialize() for objec in objecto], safe=False)
