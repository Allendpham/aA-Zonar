from flask_socketio import SocketIO, emit
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
