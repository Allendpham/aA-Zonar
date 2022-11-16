from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from app.models import PrivateChat, User, db, PrivateChatMessage
from app.forms import PrivateMessageForm

private_chat_routes = Blueprint('privateChats', __name__)


@private_chat_routes.route('/current')
@login_required
def get_private_chats():
   """
   Get all current users private chats
   """
   user = current_user.to_dict()
   allChats = PrivateChat.query.all()
   return { 'privatechats' : [chat.to_dict() for chat in allChats if user in chat.to_dict()['users']] }


@private_chat_routes.route('/<int:privatechatId>')
@login_required
def get_one_private_chat(privatechatId):
   """
   Query to get one private chat details
   """
   single_private = PrivateChat.query.get(privatechatId)
   return {'privatechat': single_private.to_dict() }

@private_chat_routes.route('', methods=['POST'])
@login_required
def create_private_chat():
   """
   Create a private chat
   """
   # Getting the user to connect to
   userId = request.body.userId
   connecting_user = User.get_or_404(userId)

   # Query to get the current user
   user = User.get_or_404(current_user.id)

   # Create a new Private Chat Instance
   new_private_chat = PrivateChat()

   # Connect both users to the new Private Chat Instance
   current_user.privatechats.append(new_private_chat)
   user.privatechats.append(new_private_chat)
   db.session.commit()

   return { 'privatechat': new_private_chat.to_dict() }


@private_chat_routes.route('/<int:privatechatId>/messages')
@login_required
def get_private_chat_messages(privatechatId):
   """
   Get all private chat messages of one chat
   """
   all_private_chat_messages = PrivateChatMessage.query.filter(PrivateChatMessage.privateChatId == privatechatId)
   return {"messages":[message.to_dict() for message in all_private_chat_messages]}

@private_chat_routes.route('/<int:privatechatId>/messages', methods=['POST'])
@login_required
def post_channelmessages(privatechatId):
   """
   Post one message on private chat
   """
   form = PrivateMessageForm()
   form['csrf_token'].data = request.cookies['csrf_token']
   if form.validate_on_submit():
      data = form.data
      new_message = PrivateChatMessage(message=data['message'],
                                 userId=data['userId'],
                                 privateChatId=data['privateChatId'])
      db.session.add(new_message)
      db.session.commit()
      return {"message":new_message.to_dict()}
   return {'errors': validation_errors_to_error_messages(form.errors)}, 401
