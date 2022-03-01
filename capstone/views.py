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
from .models import User, Coins, Invitation, Group, Message, Notification, ChatModel


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
    objecto = User.objects.exclude(username=request.user.username)
    objecto = objecto.order_by("-date").all()
    # return JsonResponse([],safe=false)
    return Response([objec.serialize() for objec in objecto], status=200)


@api_view(['POST'])
def createInvitation(request):
    data = json.loads(request.body)
    user = request.user
    user1 = User.objects.get(user_id=data["user1"])
    invitation1 = data["invitation1"]
    user2 = User.objects.get(data["user2"])
    invitation2 = data["invitation2"]
    if invitation1 and invitation2:
        invitation = Invitation.objects.create(
            user=user, user1=user1, user2=user2, invitation1=invitation1, invitation2=invitation2)
    elif invitation1 and invitation2 == False:
        invitation = Invitation.objects.create(
            user=user, user1=user1, user2=False, invitation1=invitation1, invitation2=False)
    elif invitation2 and invitation1 == False:
        invitation = Invitation.objects.create(
            user=user, user2=user2, user1=False, invitation2=invitation1, invitation1=False)
    else:
        return Response({"message": "Las invitaciones fueron rechazadas"}, status=400)
    return Response(invitation.serialize())


@api_view(['PUT'])
def UpdateInvitation(request):
    jd = json.loads(request.body)
    invitation = Invitation.objects.get(id=jd['id'])
    invitation.user1 = User.objects.get(id=jd["user1"])
    invitation.user2 = User.objects.get(id=jd["user2"])
    invitation.invitation1 = jd["invitation1"]
    invitation.invitation2 = jd["invitation2"]
    invitation.save()
    return Response(invitation.serialize())


@api_view(['GET'])
def getMessages(request, room_name):
    objecto = Message.objects.filter(room=room_name)
    objecto = objecto.order_by("-date").all()
    # return JsonResponse([],safe=false)
    return Response([objec.serialize() for objec in objecto])


@api_view(['GET'])
def getNotification(request, room_name):
    objecto = Message.objects.filter(room=room_name)
    objecto = objecto.order_by("-date").all()
    # return JsonResponse([],safe=false)
    return Response([objec.serialize() for objec in objecto])


# clone whatsap
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def chatPage(request, username):
    user_obj = User.objects.get(username=username)
    users = User.objects.exclude(username=request.user.username)
    #users = User.objects.exclude(username='nahuel')
    user = request.user
    if user is None:
        print(user.username)
        return Response(user.serialize())
    if request.user.id > user_obj.id:
        # if 1 > user_obj.id:
        thread_name = f'chat_{request.user.id}-{user_obj.id}'
    else:
        thread_name = f'chat_{user_obj.id}-{request.user.id}'
    message_objs = ChatModel.objects.filter(thread_name=thread_name)
    context = {'user': user_obj, 'users': users, 'messages': message_objs}

    return Response([objec.serialize() for objec in message_objs])
