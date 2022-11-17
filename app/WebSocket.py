from flask_socketio import SocketIO, emit, send, join_room, leave_room, rooms
from flask import request
from .models import ChannelMessage, PrivateChatMessage, User
from flask_login import current_user
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
    emit("chat", data['msg'], room=data['room'])


@socketio.on('join')
def joinroom(data):
    user = current_user.to_dict()
    curr_rooms = rooms(sid=None, namespace=None)
    for room in curr_rooms:
        if room != user:
            leave_room(room)
    if 'channel' in data:
        room = f"{data['channel']['name']} {data['channel']['id']} {data['channel']['serverId']}"
    else:
        room = f"privatechat: {data['chat']}" #come back to this
    join_room(room)
    emit("currRoom", {"room": room})
    # emit("chat",{'message': {
    #         'userId': user['id'],
    #         'channelId': data['channel']['id'],
    #         'message': f"{user['username']} joined room {room.split()[0]}"
    #     }}, room=room)

@socketio.on('fetch')
def fetch_msgs(data):
    user = request.sid
    if 'channel' in data:
        messages = ChannelMessage.query.filter(ChannelMessage.channelId == data['channel']['id'])
        room = f"{data['channel']['name']} {data['channel']['id']} {data['channel']['serverId']}"
    else:
        messages = PrivateChatMessage.query.filter(PrivateChatMessage.privateChatId == data['chat'])
        room = f"privatechat: {data['chat']}"

    last100Messages = {'messages':[message.to_dict() for message in messages][-10:]} ##change slice to fit CSS goals later
    print('================MSGS-========================', last100Messages, room)
    emit('last_100_messages', last100Messages, room= room)
