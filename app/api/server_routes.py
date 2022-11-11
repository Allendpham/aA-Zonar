from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Server


server_routes = Blueprint('servers', __name__)

@server_routes.route('')
@login_required
def server_root():
    servers = Server.query.all()

    return {'servers': [server.to_dict() for server in servers]}
