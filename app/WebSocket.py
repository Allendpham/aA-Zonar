from flask_socketio import SocketIO, emit, send, join_room, leave_room, rooms
from flask import request
from .models import ChannelMessage
import os


# create your SocketIO instance
if os.environ.get("FLASK_ENV") == "production":
    origins = [
         "http://aa-zonar.onrender.com/",
        "https://aa-zonar.onrender.com/"
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins,logger=True, engineio_logger=True )


# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    print('dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', data)
    emit("chat", data['msg'], room=data['room'])
    # send(data['msg'], to=data['room'])


@socketio.on('join')
def joinroom(data):
    user = request.sid
    curr_rooms = rooms(sid=None, namespace=None)
    for room in curr_rooms:
        if room != user:
         leave_room(room)
    room = data['channel']['name']
    join_room(room)
    messages = ChannelMessage.query.filter(ChannelMessage.channelId == data['channel']['id'])
    last100Messages = {'messages':[message.to_dict() for message in messages]} ##change slice to fit CSS goals later
    print(last100Messages)
    emit('last_100_messages', last100Messages, room=user)
    emit("chat", {
            'userId': 1,
            'channelId': 1,
            'message': f'joined room {room}'
        }, room=room)
