from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required
# from app.models import Channel, db, ChannelMessage
# from app.forms import ChannelForm, MessageForm
# from .auth_routes import validation_errors_to_error_messages

test_routes = Blueprint('test', __name__)


@test_routes.route('')
@login_required
def test():
  return 'hello from test'
