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
from .models import User, Coins, GroupDetails, Message, ChatModel


# ----------------Token Views-------------------------
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['id'] = user.id
        print(token)
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


grupos = GroupDetails.objects.all()

print(len(grupos))


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/capstone_api/token',
        '/capstone_api/token/refresh'
    ]

    return Response(routes)

# -----------------------------


# -----------User Views---------------

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def myUser(request):
    objecto = User.objects.get(id=request.user.id)
    # return JsonResponse([],safe=false)
    return Response(objecto.serialize(), status=200)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def allUsers(request):
    objecto = User.objects.exclude(username=request.user.username)
    objecto = objecto.order_by("-date").all()
    # return JsonResponse([],safe=false)
    return Response([objec.serialize() for objec in objecto], status=200)


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
        createCoins(user)
        return Response({'user_info': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
        }})
    else:
        return Response({"message": "usage method post"}, status=400)

# -----------------------


# -----------Coins Views-------------
def createCoins(user):
    Coins.objects.create(user=user)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCoins(request):
    user = request.user
    print(user.id)
    coins = Coins.objects.filter(user_id=user.id)
    serializer = CoinsSerializer(coins, many=True)
    print(serializer.data)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAllCoins(request):
    user = request.user
    print(user.id)
    coins = Coins.objects.all()
    serializer = CoinsSerializer(coins, many=True)
    return Response(serializer.data)

# ------------------------------


# -----------GroupDetails Views--------------

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createGroupDetails(request):
    user = request.user
    data = json.loads(request.body)
    name = data['name']
    theme = data['theme']
    description = data['description']
    group = GroupDetails.objects.create(user=user, name=name,
                                        theme=theme, description=description)
    return Response(group.serialize(), status=200)


@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def modGroupDetails(request, id):
    data = json.loads(request.body)
    group = GroupDetails.objects.get(id=id)
    value = False
    try:
        if data['invitation']:
            if group.invitation1 == False:
                group.invitation1 = True
                group.user1 = User.objects.get(id=data['user'])
                value = True
            elif group.invitation2 == False:
                group.invitation2 = True
                group.user2 = User.objects.get(id=data['user'])
                value = True
            else:
                print({'message': 'Not changes invitation'})
    except:
        print({'message': 'Not changes invitation'})
    try:
        if data['active'] == False:
            group.active = False
            value = True
            grups = GroupDetails.objects.filter(user=request.user)
            if len(grups) > 10:
                grupDelete = GroupDetails.objects.filter(user=request.user)
                print(grupDelete)
                for grup in grupDelete[0:1]:
                    grup.delete()
    except:
        print({'message': 'Not changes active'})

    if value:
        group.save()
        return Response(group.serialize(), status=200)
    else:
        return Response({'message': 'Not changes'}, status=200)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getGroupDetails(request):
    try:
        details = GroupDetails.objects.get(
            user_id=request.user.id, active=True)
        if details:
            return Response(details.serialize(), status=200)
        else:
            return Response({"message": "No se ha encontrado ningun grupo disponible"}, status=400)
    except:
        return Response({"message": "No se ha encontrado ningun grupo disponible"}, status=400)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteGroupDetails(request, id):
    try:
        details = GroupDetails.objects.get(id=id, user=request.user)
        if details:
            details.delete()
            return Response({"message": "Your last group was deleted"}, status=200)
        else:
            return Response({"message": "No available group found"}, status=400)
    except:
        return Response({"message": "No available group found"}, status=400)

# -----------------------------


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

    return Response([objec.serialize() for objec in message_objs])
