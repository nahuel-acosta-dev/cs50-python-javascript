from django.contrib import admin
from .models import User, Category,Status, Comment, List, Ofert, Tracking, Buys

# Register your models here.

class ListAdmin(admin.ModelAdmin):
    list_display = ("title", "price","activate", "date", "type", "user")

class OfertAdmin(admin.ModelAdmin):
    list_display = ("product","ofert", "date","user")

class TrackingAdmin(admin.ModelAdmin):
    list_display = ("product","user")

class CommentAdmin(admin.ModelAdmin):
    list_display = ("product","date", "calification","user")
    
class BuysAdmin(admin.ModelAdmin):
    list_display = ("product","date","user")


admin.site.register(User)
admin.site.register(Category)
admin.site.register(Status)
admin.site.register(List, ListAdmin)
admin.site.register(Ofert, OfertAdmin)
admin.site.register(Tracking, TrackingAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Buys, BuysAdmin)


