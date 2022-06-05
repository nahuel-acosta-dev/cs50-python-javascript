import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from .models import User, Posts, Following, Like


def index(request):
    return render(request, "network/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")


@csrf_exempt
@login_required
def create(request, api):
    """If it is not Post or the item name does not throw an error,
    if everything goes well, the element specified in the api variable is created"""
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)
    jd = json.loads(request.body)
    print(jd)
    if api.capitalize() == "Posts":
        Posts.objects.create(
            user_id=request.user.id, body=jd['body'], activate=True)
    elif api.capitalize() == "Following":
        Following.objects.create(
            user_id=request.user.id, user_following_id=jd['user_following_id'])
    elif api.capitalize() == "Like":
        Like.objects.create(
            user_id=request.user.id, posts_id=jd['posts_id'])
    else:
        datos = {'message': "Api not found or available error"}
        return JsonResponse(datos)
    datos = {'message': "Success"}
    return JsonResponse(datos)


def api(request):
    aviso = {"mesagge": "Enter the name of the data where you want to access"}
    return JsonResponse(aviso)


@csrf_exempt
@login_required
def open_user_api(request, api):
    """We obtain in json all the elements belonging to the logged in user, from the object
    that the user specified in the api variable, we can separate by activated and deactivated"""
    try:
        if api.capitalize() == "User":
            objecto = User.objects.get(
                id=request.user.id
            )
            return JsonResponse(objecto.serialize(), status=200)
        elif api.capitalize() == "Posts":
            objecto = Posts.objects.filter(
                user_id=request.user.id, activate=True
            )
        elif api.capitalize() == "Following":
            objecto = Following.objects.filter(
                user_id=request.user.id, activate=True
            )
        elif api.capitalize() == "Like":
            objecto = Like.objects.filter(
                user_id=request.user.id, activate=True
            )
        elif api.capitalize() == "Posts_des":
            objecto = Posts.objects.filter(
                user_id=request.user.id, activate=False
            )
        elif api.capitalize() == "Following_des":
            objecto = Following.objects.filter(
                user_id=request.user.id, activate=False
            )
        elif api.capitalize() == "Like_des":
            objecto = Like.objects.filter(
                user_id=request.user.id, activate=False
            )
        else:
            return JsonResponse({"error": "Invalid."}, status=400)
    except:
        return JsonResponse({"error": "Api not found."}, status=404)

    # Return emails in reverse chronologial order
    objecto = objecto.order_by("-date").all()
    return JsonResponse([objec.serialize() for objec in objecto], safe=False)


@csrf_exempt
@login_required
def open_api(request, api):
    """We can obtain all the data of the currently logged user, or
    all the data of the other objects, 
    it will depend on the value that is put in api what we will obtain """
    try:
        if api.capitalize() == "User":
            objecto = User.objects.get(
                id=request.user.id
            )
            return JsonResponse(objecto.serialize(), status=200)
        elif api.capitalize() == "Posts":
            objecto = Posts.objects.filter(
                activate=True
            )
        elif api.capitalize() == "Following":
            objecto = Following.objects.filter(
                activate=True
            )
        elif api.capitalize() == "Like":
            objecto = Like.objects.filter(
                activate=True
            )
        elif api.capitalize() == "Posts_des":
            objecto = Posts.objects.filter(
                activate=False
            )
        elif api.capitalize() == "Following_des":
            objecto = Following.objects.filter(
                activate=False
            )
        elif api.capitalize() == "Like_des":
            objecto = Like.objects.filter(
                activate=False
            )
        else:
            return JsonResponse({"error": "Invalid."}, status=400)
    except:
        return JsonResponse({"error": "Api not found."}, status=404)

    # Return objecto in reverse chronologial order
    objecto = objecto.order_by("-date").all()
    return JsonResponse([objec.serialize() for objec in objecto], safe=False)


@csrf_exempt
def open_api_object(request, api, element, object_id):
    try:
        # We get all the likes given to a specified post
        if api.capitalize() == "Like" and element == "posts":
            objecto = Like.objects.filter(
                posts_id=object_id, activate=True)
        # We get all the followers of a specific user
        elif api.capitalize() == "Following" and element == "userfollowing":
            objecto = Following.objects.filter(
                user_following_id=object_id, activate=True)
        else:
            return JsonResponse(
                {"error": "Api not found or not encounter"}, status=404)
    except:
        return JsonResponse({"error": "Api not found."}, status=404)

    # Return objecto in reverse chronologial order
    objecto = objecto.order_by("-date").all()
    return JsonResponse([objec.serialize() for objec in objecto], safe=False)


@csrf_exempt
@login_required
def open_select_user_api_all(request, api, user_id):
    # we get the elements (api variable) of the user that was indicated in user_id
    try:
        if api.capitalize() == "Posts":
            objecto = Posts.objects.filter(
                user_id=user_id, activate=True
            )
        elif api.capitalize() == "Following":
            objecto = Following.objects.filter(
                user_id=user_id, activate=True
            )
        elif api.capitalize() == "Like":
            objecto = Like.objects.filter(
                user_id=user_id, activate=True
            )
        else:
            return JsonResponse({"error": "Api not found or api not encounter."}, status=404)

    except:
        return JsonResponse({"error": "Api not found."}, status=404)

    # Return objecto in reverse chronologial order
    objecto = objecto.order_by("-date").all()
    return JsonResponse([objec.serialize() for objec in objecto], safe=False)


@csrf_exempt
@login_required
def open_api_user_object(request, api, object_id):
    """We can get the like that the logged in user gave to a specified post,
    or we can obtain if the logged in user is following another user that has been specified
    in object_id"""
    try:
        if api.capitalize() == "Like":
            objecto = Like.objects.get(
                user_id=request.user.id, posts_id=object_id)
        elif api.capitalize() == "Following":
            objecto = Following.objects.get(
                user_id=request.user.id, user_following_id=object_id)
        else:
            return JsonResponse({"error": "Api not found or the function is not programmed."}, status=404)
    except:
        return JsonResponse({"error": "Api not found."}, status=404)

    return JsonResponse(objecto.serialize(), status=200)


@csrf_exempt
@login_required
def open_single_api(request, api, id):
    # we obtain an individual and specific element indicated in the id variable.
    # if this element is not found, an error message is returned
    try:
        if api.capitalize() == "User":
            try:
                objecto = User.objects.get(id=id)
            except:
                return JsonResponse({"error": "element not encounter."}, status=404)
        elif api.capitalize() == "Posts":
            try:
                objecto = Posts.objects.get(id=id)
            except:
                return JsonResponse({"error": "element not encounter."}, status=404)
        elif api.capitalize() == "Following":
            try:
                objecto = Following.objects.get(id=id)
            except:
                return JsonResponse({"error": "element not encounter."}, status=404)
        elif api.capitalize() == "Like":
            try:
                objecto = Like.objects.get(id=id)
            except:
                return JsonResponse({"error": "element not encounter."}, status=404)
        else:
            return HttpResponse("Api not found")
    except User.DoesNotExist or Posts.DoesNotExist or Following.DoesNotExist or Like.DoesNotExist:
        return JsonResponse({"error": "Api not found."}, status=404)

    # if it is the method it is get se only the value of the specified element is returned
    if request.method == "GET":
        return JsonResponse(objecto.serialize(), status=200)

    # if it is put we can modify the values ​​of the element
    elif request.method == "PUT":
        data = json.loads(request.body)
        if api.capitalize() != "User" and api.capitalize() != "Posts":
            if data.get("activate") is not None:
                objecto.activate = data["activate"]
        elif api.capitalize() == "Posts":
            if data.get("body") is not None:
                objecto.body = data["body"]
            if data.get("activate") is not None:
                objecto.activate = data["activate"]
        else:
            if data.get("username") is not None:
                objecto.username = data["username"]
            if data.get("first_name") is not None:
                objecto.first_name = data["first_name"]
            if data.get("last_name") is not None:
                objecto.last_name = data["last_name"]
        objecto.save()
        return HttpResponse(status=204)

    elif request.method == 'DELETE':
        objecto.delete()
        return JsonResponse({
            "message": "Success"
        }, status=200)
    else:
        return JsonResponse({
            "error": "GET, PUT or DELETE request required."
        }, status=400)
