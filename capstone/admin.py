from django.contrib import admin
from . import models
from rest_framework_simplejwt import token_blacklist


class OutstandingTokenAdmin(token_blacklist.admin.OutstandingTokenAdmin):

    def has_delete_permission(self, *args, **kwargs):
        return True  # or whatever logic you want


admin.site.unregister(token_blacklist.models.OutstandingToken)
admin.site.register(token_blacklist.models.OutstandingToken,
                    OutstandingTokenAdmin)


admin.site.register(models.User)
admin.site.register(models.Coins)
admin.site.register(models.Calification)
admin.site.register(models.Group)
admin.site.register(models.Ideas)
admin.site.register(models.RegisterGroup)
admin.site.register(models.ChatModel)
admin.site.register(models.GroupDetails)
admin.site.register(models.Invitations)
admin.site.register(models.Message)
