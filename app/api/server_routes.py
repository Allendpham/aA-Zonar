from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required
from app.models import Server, db, Channel
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
        db.session.commit()
        return {'server': new_server.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# @server_routes.route('/<int:serverId>/update', methods=['GET', 'POST'])
# def update_server(serverId):
#     """
#     Update a server
#     """
#     print("I made it here!!")
#     server = Server.query.get_or_404(serverId) # query or 404 if not found
#     if request.method == 'POST':
#         form = ServerForm()
#         form['csrf_token'].data = request.cookies['csrf_token']

#         db.session.delete(server)
#         db.session.commit()

#         if form.validate_on_submit():
#             data = form.data
#             name = data['name']
#             preview_img = data['preview_img']
#             server = Server(ownerId= data['ownerId'], name = name, preview_img = preview_img)

#             db.session.add(server)
#             db.session.commit()
#             return {'server': server.to_dict()}
#         return {'errors': validation_errors_to_error_messages(form.errors)}, 401



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

# @server_routes.route('/<int:serverId>/delete', methods=['GET', 'POST'])
# def delete_server(serverId):
#     """
#     Delete a route
#     """
#     server = Server.query.get_or_404(serverId).first()
#     if request.method == 'POST':
#         if server: # necessary?
#             db.session.delete(server)
#             db.session.commit()
#             return {"message": "Server was successfully deleted"}
#     return {"error": "Server does not exist"}, 404

    # DELETE ROUTE IN CASE ABOVE DOES NOT WORK
@server_routes.route('/<int:serverId>', methods=['DELETE'])
def delete_server(serverId):
    """
    Delete a route
    """
    server = Server.query.get_or_404(serverId)
    if server:
        db.session.delete(server)
        db.session.commit()
        return {"message": "Server was successfully deleted"}
    return {"error": "Server does not exist"}, 404
