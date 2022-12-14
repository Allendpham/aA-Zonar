from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from sqlalchemy import orm
from app.models import Server, db, Channel, User
from app.forms import ServerForm, ChannelForm
from .auth_routes import validation_errors_to_error_messages

server_routes = Blueprint('servers', __name__)

@server_routes.route('')
@login_required
def server_root():
    """
    Query for all servers and returns them in a list of server dictionaries
    """
    servers = Server.query.all()
    return {'servers': [server.to_dict() for server in servers]}

@server_routes.route('/<int:serverId>/channels')
@login_required
def get_server_channels(serverId):
    """
    Query for servers channels
    """
    channels = Channel.query.filter(Channel.serverId == serverId).all()
    return {'channels': [channel.to_dict() for channel in channels]}

@server_routes.route('/<int:serverId>/channels', methods=['POST'])
@login_required
def create_server_channel(serverId):
    """
    Create a channel on the current server
    """
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        new_channel = Channel(name=data['name'], serverId=data['serverId'])
        db.session.add(new_channel)
        db.session.commit()
        return {'channel': new_channel.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@server_routes.route('/<int:serverId>')
@login_required
def get_server(serverId):
    """
    Query for a single server
    """
    single_server = Server.query.get(serverId)
    current_user.servers.append(single_server)
    db.session.commit()
    return {'server': single_server.to_dict()}



@server_routes.route('', methods=['POST'])
@login_required
def server_create():
    '''
    Creates a new server
    '''
    form = ServerForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_server = Server(ownerId = data['ownerId'],
                            name=data['name'],
                            preview_img=data['preview_img'])
        db.session.add(new_server)

        # # Create a default general channel for newly created server
        # general_channel = Channel(name='General', serverId=new_server.id)
        # db.session.add(general_channel)

        current_user.admin.append(new_server)
        current_user.servers.append(new_server)
        db.session.commit()
        return {'server': new_server.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

    # PUT ROUTE IN CASE ABOVE DOES NOT WORK
@server_routes.route('/<int:serverId>', methods=['PUT'])
def update_server(serverId):
    """
    Update a server
    """
    server = Server.query.get_or_404(serverId) # query or 404 if not found

    form = ServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():
        data = form.data
        server.name = data['name']
        server.preview_img = data['preview_img']

        db.session.commit()
        return {'server': server.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

    # DELETE ROUTE IN CASE ABOVE DOES NOT WORK
@server_routes.route('/<int:serverId>', methods=['DELETE'])
def delete_server(serverId):
    """
    Delete a route
    """
    server = Server.query.get_or_404(serverId)
    if server:
        server.users = [] #empty the server of users and admins
        server.admins = []
        db.session.delete(server)
        db.session.commit()
        return {"message": "Server was successfully deleted"}
    return {"error": "Server does not exist"}, 404


@server_routes.route('/admins', methods=['POST'])
def add_admin():
    """
    Adds a admin to a server
    """
    request_data = request.get_json()
    userId = request_data['userId']
    serverId = request_data['serverId']

    user = User.query.get_or_404(userId)
    server = Server.query.get_or_404(serverId)

    if server and user:

        user.admin.append(server)
        db.session.commit()
        return {'message': 'Admin was successfully added'}
    return {"error": "Server or User does not exist"}, 404


@server_routes.route('/admins', methods=['DELETE'])
def delete_admin():
    """
    Delete a route
    """
    request_data = request.get_json()
    userId = request_data['userId']
    serverId = request_data['serverId']

    user = User.query.get_or_404(userId)
    server = Server.query.get_or_404(serverId)

    if server and user:

        user.admin.remove(server)
        db.session.commit()
        return {'message': 'Admin was successfully removed'}
    return {"error": "Server or User does not exist"}, 404
@server_routes.route('/<int:serverId>/users', methods=['GET'])
@login_required
def leave_server(serverId):
    """
    Query for server association to leave a server
    """

    single_server = Server.query.get(serverId)
    current_user.servers.remove(single_server)
    db.session.commit()
    return {'server': single_server.to_dict()}
