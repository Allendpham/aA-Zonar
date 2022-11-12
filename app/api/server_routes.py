from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required
from app.models import Server, db
from app.forms import ServerForm

server_routes = Blueprint('servers', __name__)

@server_routes.route('')
@login_required
def server_root():
    """
    Query for all servers and returns them in a list of server dictionaries
    """
    servers = Server.query.all()
    return {'servers': [server.to_dict() for server in servers]}

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
        return new_server.to_dict()
    return form.data.error

@server_routes.route('/<int: serverId>/update', methods=['GET', 'POST'])
def update_server(serverId):
    """
    Update a server
    """
    server = Server.query.get_or_404(serverId) # query or 404 if not found
    if request.method == 'POST':
        if server:
            db.session.delete(server)
            db.session.commit()
            
            name = request.json['name']
            preview_img = request.json['preview_img']
            server = Server(id = serverId, name = name, preview_img = preview_img)
            
            db.session.add(server)
            db.session.commit()
            return server.to_dict()
        return "Server does not exist"

@server_routes.route('/<int: serverId>/delete', methods=['GET', 'POST'])
def delete_server(serverId):
    """ 
    Delete a route
    """
    server = Server.query.get_or_404(serverId)
    if request.method == 'POST':
        if server:
            db.session.delete(server)
            db.session.commit()
            return redirect('/api/servers')
    return "Server does not exist"

