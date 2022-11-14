from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required
from app.models import Channel, db
from app.forms import ChannelForm
from .auth_routes import validation_errors_to_error_messages

channel_routes = Blueprint('channels', __name__)


@channel_routes.route('/<int:channelId>', methods=['PUT'])
@login_required
def update_channel(channelId):
   """
   Update a channel
   """
   channel = Channel.query.get_or_404(channelId)

   form = ChannelForm()
   form['csrf_token'].data = request.cookies['csrf_token']

   if form.validate_on_submit():
      data = form.data
      channel.name = data['name']

      db.session.commit()
      return {'channel': channel.to_dict()}
   return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@channel_routes.route('/<int:channelId>', methods=['DELETE'])
@login_required
def delete_channel(channelId):
   """
   Delete a channel
   """
   channel = Channel.query.get_or_404(channelId)

   if channel:
      db.session.delete(channel)
      db.session.commit()
      return {"message": "Channel was successfully deleted"}
   return {"error": "Channel does not exist"}, 404


@channel_routes.route('/<int:channelId>')
@login_required
def get_channel(channelId):
   """
   Query for one channel
   """
   channel = Channel.query.get_or_404(channelId)
   return {'channel': channel.to_dict()}
