import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.consumer import AsyncConsumer
from asgiref.sync import sync_to_async
from django.contrib.auth.models import AnonymousUser
from channels.db import database_sync_to_async
from .models import Message, User, ChatModel, Invitations, GroupDetails, PreRoom


class CapstoneRoomConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        type_message = text_data_json['type_message']
        response = text_data_json['response']
        group_id = text_data_json['group_id']
        user_id = text_data_json['user_id']
        name = text_data_json['name']
        title = text_data_json['title']
        theme = text_data_json['theme']
        description = text_data_json['description']

        await self.save_message(self.room_group_name, type_message, response, name)
        await self.update_group(group_id, user_id, response, type_message)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'type_message': type_message,
                'response': response,
                'name': name,
                'group_id': group_id,
                'user_id': user_id,
                'title': title,
                'theme': theme,
                'description': description
            }
        )

    async def chat_message(self, event):
        type_message = event['type_message']
        response = event['response']
        name = event['name']
        group_id = event['group_id']
        user_id = event['user_id']
        title = event['title']
        theme = event['theme']
        description = event['description']

        await self.send(text_data=json.dumps({
            'type_message': type_message,
            'response': response,
            'group_id': group_id,
            'user_id': user_id,
            'name': name,
            'title': title,
            'theme': theme,
            'description': description
        }))

    @database_sync_to_async
    def save_message(self, room, type_message, response, name):
        Invitations.objects.create(
            room=room, type_message=type_message, message=response, name=name)

    @database_sync_to_async
    def update_group(self, group_id, user_id, response, type_message):
        print(response)
        if response == True and type_message == 'response':
            user = User.objects.get(id=user_id)
            print(user.id)
            group = GroupDetails.objects.get(id=int(group_id))
            if group.invitation1 == False and user:
                group.user1 = User.objects.get(id=user_id)
                group.invitation1 = True
                group.save()
            elif group.invitation2 == False and user:
                group.user2 = User.objects.get(id=user_id)
                group.invitation2 = True
                group.save()


class PreRoomPrivateConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from web socket
    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']
        username = data['username']
        room = data['room']

        await self.save_message(username, room, message)

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'username': username
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']
        username = event['username']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'username': username
        }))

    @sync_to_async
    def save_message(self, username, room, message):
        PreRoom.objects.create(username=username, room=room, content=message)


class ChatPrivateConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from web socket
    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']
        username = data['username']
        room = data['room']

        await self.save_message(username, room, message)

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'username': username
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']
        username = event['username']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'username': username
        }))

    @sync_to_async
    def save_message(self, username, room, message):
        Message.objects.create(username=username, room=room, content=message)


class PersonalChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        #user = self.scope['user']
        print('este es mi usuario')
        # print(user)
        my_id = self.scope['url_route']['kwargs']['user']
        print(my_id)
        other_user_id = self.scope['url_route']['kwargs']['id']
        print('viene el usuario')
        print(my_id, other_user_id)
        if int(my_id) > int(other_user_id):
            self.room_name = f'{my_id}-{other_user_id}'
        else:
            self.room_name = f'{other_user_id}-{my_id}'

        self.room_group_name = 'chat_%s' % self.room_name

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def receive(self, text_data=None, bytes_data=None):
        data = json.loads(text_data)
        model = data['model']
        title = data['title']
        theme = data['theme']
        description = data['description']
        response = data['response']
        username = data['username']
        user_id = data['user_id']

        await self.save_message(username, self.room_group_name, response, model, title, theme, description, user_id)
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'model': model,
                'title': title,
                'theme': theme,
                'description': description,
                'response': response,
                'username': username,
                'user_id': user_id
            }
        )

    async def chat_message(self, event):
        model = event['model']
        title = event['title']
        theme = event['theme']
        description = event['description']
        response = event['response']
        username = event['username']
        user_id = event['user_id']

        await self.send(text_data=json.dumps({
            'model': model,
            'title': title,
            'theme': theme,
            'description': description,
            'response': response,
            'username': username,
            'user_id': user_id
        }))

    async def disconnect(self, code):
        self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    @database_sync_to_async
    def save_message(self, username, thread_name, response, model, title, theme, description, user_id):
        ChatModel.objects.create(
            sender=username, theme=theme, thread_name=thread_name, description=description,
            response=response, title=title, model=model)
