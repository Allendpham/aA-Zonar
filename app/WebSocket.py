from flask_socketio import SocketIO, emit
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
socketio = SocketIO(cors_allowed_origins=origins)


# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    emit("chat", data, broadcast=True)

@socketio.on('connect')
def old_messages():
    messages = ChannelMessage.query.all()
    last100Messages = {'messages':[message.to_dict() for message in messages]}
    emit('last_100_messages', last100Messages)
