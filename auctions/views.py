from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.utils.translation import activate

from .models import User, List, Category, Tracking,Comment,Status, Ofert,Buys


def index(request):
    """I get in the variable buys the number of purchases of the user,
    then I save the amount in the variable cant, in "list" I save
    all products that are active and I pass it along with "cant" to
    the template
    """
    if request.user.is_authenticated:
        username = request.user.username
        user = User.objects.get(username=username)
        buys = Buys.objects.filter(user=user)
        cant = 0
        for buy in buys:
            cant += 1
        return render(request, "auctions/index.html", {
            "list": List.objects.filter(activate = True),
            "cant": cant
        })
    else:
        return render(request, "auctions/index.html", {
            "list": List.objects.filter(activate = True)
        })


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
            return render(request, "auctions/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "auctions/login.html")


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
            return render(request, "auctions/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "auctions/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "auctions/register.html")


def category(request):
    """Displays all available categories"""
    return render(request, "auctions/category.html", {
        "categories": Category.objects.all()
    })


def filter(request, category_type):
    """I get through the url the category, and 
    in "products" I save all the products belonging
    to that category and that they are also active
    """
    productos = Category.objects.get(type = category_type)
    return render(request, "auctions/filter.html", {
        "products": List.objects.filter(type = productos, activate = True)
    })

def product(request, product_title, product_id):
    """I get through the url the product I want to show,
    then I filter and obtain all the comments pertaining to that product,
    I verify if in the buys the product that we obtained is found, if the product is found, it can no longer be
    product will not be able to be activated again because it was already acquired by a person.
    Later I verify if the object is in the user's tracking list, if it is, I show the option to deactivate it.
    If it is, I show the option to deactivate, otherwise the opposite option will be shown.
    """
    element = List.objects.get(title = product_title, id= product_id)
    comments = Comment.objects.filter(product=element)
    buys = Buys.objects.all()
    acquired = False
    for buy in buys:
        if buy.product == element:
            acquired = True
            break
        else:
            acquired = False
    if request.user.is_authenticated:
        username = request.user.username
        user = User.objects.get(username = username)
    try:
        trackings = Tracking.objects.get(user = user,product = element)
        if trackings:
            return render(request, "auctions/product_delete.html",{
                "product": element,
                "comments": comments,
                "acquired":acquired
            })
    except:
        return render(request, "auctions/product_add.html",{
            "product": element,
            "comments": comments,
            "acquired":acquired
        })
        
        
def my_listings(request):
    """I get the number of products published by the user and
    I show them
    """
    username = request.user.username
    user = User.objects.get(username = username)
    products = List.objects.filter(user = user)
    return render(request, "auctions/my_listings.html",{
        "products":products
    })
    
        
def create_listing(request):
    """Sent all categories and quantity conditions in which the product is located, 
    so that the form can be completed. Once I receive the completed form I save in 
    variables all the data obtained, and then the uses to be able to create a new product,
    I save that product and in case it is activated I redirect to the function necessary to display
    the product, if it is disabled redirect to index"""
    categories = Category.objects.all()
    condition = Status.objects.all()
    if request.method == "POST":
        username = request.user.username
        user = User.objects.get(username = username)
        title = request.POST["title"]
        price = request.POST["price"]
        image = request.POST["image"]
        description = request.POST["description"]
        try:
            activa = request.POST["activate"]
            if activa == "on":
                activate = True
            else:
                activate = False
        except:
            activate = False
        stat = request.POST["condition"]
        status = Status.objects.get(status=stat)
        category = request.POST["category"]
        type = Category.objects.get(type = category)
        product = List.objects.create(user=user, title=title, price=price, image=image, description=description, 
                            activate=activate, status=status, type=type)
        if activate == True:
            return HttpResponseRedirect(reverse("product", args=(product.title,product.id,)))
        else: 
            return HttpResponseRedirect(reverse("index"))
    return render(request, "auctions/create_listing.html",{
        "categories":categories,
        "condition":condition
    })
        
def watchlist(request):
    """I get all the products that the user is currently following and pass it
    to the template so that they can be shown to the user"""
    username = request.user.username
    user = User.objects.get(username = username)
    trackings = Tracking.objects.filter(user = user)
    return render(request, "auctions/watchlist.html",{
            "trackings": trackings
    })

def add_product(request, product_title):
    """This function is used to add a product to the watchlist,
    I get the product from the url, and then I also get the user who wants to add that object to their list of 
    tracking. Finally I add the data to the watchlist and redirect to the "product" function that is 
    will take care of showing the user the product they were viewing again"""
    product = List.objects.get(title = product_title)
    if request.method == "POST":
        user = request.POST["button"]
        usuario = User.objects.get(username = user)
        Tracking.objects.create(user = usuario, product = product)
    return HttpResponseRedirect(reverse("product", args=(product.title,product.id,)))

def delete_product(request, product_title, product_id):
    """This function is used to remove a product from the watchlist,
    I get the product to be removed from the watchlist and then I get the
    user who has loaded that product in his watchlist, I charge the data in 
    the variable "track" and remove it from the database. Redirect to show the user the updated product"""
    product = List.objects.get(title = product_title, id = product_id)
    if request.method == "POST":
        username = request.POST["button"]
        user = User.objects.get(username = username)
        track = Tracking.objects.get(user = user,product = product)
        Tracking.delete(track)
    return HttpResponseRedirect(reverse("product", args=(product.title,product.id,)))

def add_comment(request, product_title):
    """I get the product from the url, I collect the data sent by the form
    needed to create a new comment and finally create the new comment. 
    Redirect back to product
    """
    product = List.objects.get(title = product_title)
    if request.method == "POST":
        user = request.POST["button_comment"]
        usuario = User.objects.get(username = user)
        calification = request.POST["calification"]
        comment = request.POST["comment"]
        Comment.objects.create(user = usuario, product = product, comment = comment, calification = calification)
    return HttpResponseRedirect(reverse("product", args=(product.title,product.id,)))

def delete_comment(request, product_title):
    """I save the product in a variable to later redirect myself to it,
    I get the id of the comment I want to delete, then with that id I get the comment 
    and I go on to delete it. Finally redirect"""
    product = List.objects.get(title = product_title)
    if request.method == "POST":
        id = request.POST["button_delete_comment"]
        delete_comment = Comment.objects.get(id = id);
        Comment.delete(delete_comment)
    return HttpResponseRedirect(reverse("product", args=(product.title,product.id,)))

def activate_listing(request, product_id):
    """I get the product I want to activate and activate it, then I save the product
    up-to-date. redirect to the function needed to display the product"""
    product = List.objects.get(id = product_id)
    product.activate = True
    List.save(product)
    return HttpResponseRedirect(reverse("product", args=(product.title,product.id,)))

def desactivate_listing(request, product_id):
    """I get from the url the id of the product I want to deactivate, then I get the product.
    I turn it off and save it with its updated parameters. I check if there are offers for that
    product, in case they exist I get the most offer, I call the "buy" function to save
    in the database of the winning user the new product.
    In case there are no offers for that product I simply redirect myself back to the already deactivated product
    """
    product = List.objects.get(id = product_id)
    product.activate = False
    List.save(product)
    try:
        oferts = Ofert.objects.filter(product = product)
        list_ofert = []
        for ofert in oferts:
            list_ofert.append(ofert.ofert)
        ofert = max(list_ofert)
        new_ofert = Ofert.objects.get(product = product, ofert = ofert)
    except:
        new_ofert = False
    if new_ofert:
       return buy(new_ofert.user.username, product)
    else:
        return HttpResponseRedirect(reverse("product", args=(product.title,product.id,)))

def new_ofert(request, product_id):
    """Primero obtengo el usuario que desea hacer esa oferta, luego de la url obtengo el 
    producto por el que se desea ofertar, Si ya existe un oferta de el usuario obtenido por el producto,
    simplemente actualizo esa oferta, y me redirijo al producto.
    En caso de que no exista creo una nueva oferta y redirijo al producto"""
    username = request.user.username
    user = User.objects.get(username = username)
    product = List.objects.get(id = product_id)
    ofert = request.POST["ofert"]
    try:
        save_ofert = Ofert.objects.get(user = user,product = product)
        save_ofert.ofert = ofert
        Ofert.save(save_ofert)
        return HttpResponseRedirect(reverse("product", args=(product.title,product.id,)))
    except:
        Ofert.objects.create(user = user, product = product, ofert = ofert)
        return HttpResponseRedirect(reverse("product", args=(product.title,product.id,)))

def buy(ofert, product):
    """In the parameters I receive the username of the offer, and also the product.
    I get the user, and create the new Buys, redirect to the product"""
    username = ofert
    user = User.objects.get(username = username)
    Buys.objects.create(user = user, product = product)
    return HttpResponseRedirect(reverse("product", args=(product.title,product.id,)))

def my_buy(request):
    """I get the user and filter all the buys belonging to that user to 
    then display them"""
    username = request.user.username
    user = User.objects.get(username = username)
    buys = Buys.objects.filter(user = user)
    return render(request, "auctions/buy.html",{
            "buys": buys
    })
    