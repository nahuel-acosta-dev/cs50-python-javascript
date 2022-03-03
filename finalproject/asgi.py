"""
ASGI config for finalproject project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
from capstone.channelsmiddleware import TokenAuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import capstone.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'finalproject.settings')

application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': TokenAuthMiddlewareStack(
        URLRouter(
            capstone.routing.websocket_urlpatterns
        )
    )
})

"""application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': TokenAuthMiddleware(
        URLRouter(
            capstone.routing.websocket_urlpatterns
        )
    )
})"""
