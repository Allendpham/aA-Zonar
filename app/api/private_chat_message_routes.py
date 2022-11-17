from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required
from app.models import PrivateChatMessage, db
from app.forms import PrivateMessageForm
from .auth_routes import validation_errors_to_error_messages

private_chat_message_routes = Blueprint('privateChatMessages', __name__)


@private_chat_message_routes.route('/<int:privatechatmessageId>', methods=['PUT'])
# @login_required
def update_channel_message(privatechatmessageId):
  message = PrivateChatMessage.query.get_or_404(privatechatmessageId)
  """
  Update a message
  """
  form = PrivateMessageForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
      data = form.data
      message.message=data['message']
      message.userId=data['userId']
      message.privateChatId=data['privateChatId']
      db.session.commit()
      return {"message": message.to_dict()}
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@private_chat_message_routes.route('/<int:privatechatmessageId>', methods=['DELETE'])
@login_required
def delete_channel_message(privatechatmessageId):
  """
  Delete a message
  """
  message = PrivateChatMessage.query.get_or_404(privatechatmessageId)
  if message:
      db.session.delete(message)
      # message.delete(synchronize_session=False)
      db.session.commit()
      return {"message": "Private chat message was successfully deleted"}
  return {"error": "Private chat message does not exist"}, 404
