from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import MaxValueValidator
from django.utils import timezone

class User(AbstractUser):
    pass

class Category(models.Model):
    urls = models.CharField(default="https://cdn.pixabay.com/photo/2016/09/24/20/11/dab-1692452_640.png",max_length=200)
    type = models.CharField(max_length=64)

    def __str__(self):
        return self.type

class Status(models.Model):
    status = models.CharField(default="Nuevo",max_length=64)

    def __str__(self):
        return self.status

class List(models.Model):
    user = models.ForeignKey(User,on_delete=models.PROTECT, related_name="creator_product")
    title = models.CharField(max_length=64)
    price = models.PositiveIntegerField()
    image = models.CharField(default="https://cdn.pixabay.com/photo/2016/09/24/20/11/dab-1692452_640.png",max_length=200)
    date = models.DateTimeField(default=timezone.now)
    description = models.TextField()
    activate = models.BooleanField()
    status = models.ForeignKey(Status,on_delete=models.CASCADE, related_name="status_product")
    type = models.ForeignKey(Category, on_delete=models.PROTECT, related_name="category")

    def __str__(self):
        return f"{self.title}"

class Ofert(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT, related_name="ofert_user")
    product = models.ForeignKey(List, on_delete=models.PROTECT, related_name="ofert_product")
    date = models.DateTimeField(default=timezone.now)
    ofert = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.product} {self.ofert}"


class Tracking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(List,on_delete=models.CASCADE)
    date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.product}"


class Comment(models.Model):
    user = models.ForeignKey(User,on_delete=models.PROTECT, related_name='usuario')
    product = models.ForeignKey(List, on_delete=models.PROTECT, related_name="product_comment")
    date = models.DateTimeField(default=timezone.now)
    comment = models.TextField(max_length=1500)
    calification = models.PositiveIntegerField(validators=[MaxValueValidator(10)])

    def __str__(self):
        return f"{self.date} {self.calification}"
    
class Buys(models.Model):
    user = models.ForeignKey(User,on_delete=models.PROTECT, related_name='usuario_buys')
    product = models.ForeignKey(List, on_delete=models.PROTECT, related_name="product_buys")
    date = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f"{self.product}"

