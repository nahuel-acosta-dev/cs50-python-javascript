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
from .models import User, Coins, Invitation, Group


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
    coins = Coins.objects.filter(user_id=user.id)
    serializer = CoinsSerializer(coins, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createGroup(request):
    user = request.user


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def allUsers(request):
    objecto = User.objects.all()
    objecto = objecto.order_by("-date").all()
    # return JsonResponse([],safe=false)
    return Response([objec.serialize() for objec in objecto])


@api_view(['POST'])
def createInvitation(request):
    user = request.user
    user1 = request.POST["user1"]
    invitation1 = request.POST["invitation1"]
    user2 = request.POST["user2"]
    invitation2 = request.POST["invitation2"]
    if invitation1 and invitation2:
        invitation = Invitation.objects.create(
            user=user, user1=user1, user2=user2, invitation1=invitation1, invitation2=invitation2)
        return Response(invitation.serialize())


def room(request, room_name):
    return render(request, 'chatroom.html', {
        'room_name': room_name
    })


"""def createGroup(request, invitation1, invitation2):
    if invitation1 and invitation2:
        user1 = User.objects.get(id=invitation1.id)
        user2 = User.objects.get(id=invitation2.id)
    elif invitation1 and invitation2 == False:
        user1 = User.objects.get(id=invitation1.id)
        user2 = False
    elif invitation2 and invitation1 == False:
        user1 = False
        user2 = User.objects.get(id=invitation2.id)
    Group.objects.create(user=request.user, user1=user1, user2=user2)"""
