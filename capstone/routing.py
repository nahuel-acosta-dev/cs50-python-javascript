from django.urls import re_path, path
from . import consumers


websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<room_name>\w+)/$',
            consumers.CapstoneRoomConsumer.as_asgi()),
    re_path(r'ws/notification/(?P<room_name>\w+)/$',
            consumers.NotificationConsumer.as_asgi()),
    path('ws/<str:room_name>/', consumers.ChatPrivateConsumer.as_asgi()),
    path('ws/private/<int:id>/<int:user>',
         consumers.PersonalChatConsumer.as_asgi()),
]
