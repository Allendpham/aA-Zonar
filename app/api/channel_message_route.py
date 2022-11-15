from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required
from app.models import Channel, db, ChannelMessage
from app.forms import ChannelForm, MessageForm
from .auth_routes import validation_errors_to_error_messages

channel_message_routes = Blueprint('channelMessages', __name__)


@channel_message_routes.route('')
@login_required
def test():
  return 'hello from test'

@channel_message_routes.route('/<int:channel_message_id>', methods=['PUT'])
# @login_required
def update_channel_message(channel_message_id):
  message = ChannelMessage.query.get_or_404(channel_message_id)
  """
  Update a message
  """
  print('++++++++++++++++++++++++++++++++++++++ggggggggg',message)
  form = MessageForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
      data = form.data
      message.message=data['message']
      message.userId=data['userId']
      message.channelId=data['channelId']
      db.session.commit()
      return {"message": message.to_dict()}
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@channel_message_routes.route('/channel_messages/<int:channel_message_Id>', methods=['DELETE'])
@login_required
def delete_channel_message(channel_message_Id):
  """
  Delete a message
  """
  message = ChannelMessage.query.get_or_404(channel_message_Id)
  print("+++++++++++++++++++++++=", message)
  if message:
      db.session.delete(message)
      # message.delete(synchronize_session=False)
      db.session.commit()
      return {"message": "Channel was successfully deleted"}
  return {"error": "Channel does not exist"}, 404
