from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.orm import relationship
from .db import add_prefix_for_prod



# Base = declarative_base() <--- USELESS

server_users = db.Table(
    "server_users",
    db.Column('serverId', db.Integer, db.ForeignKey(add_prefix_for_prod('servers.id'))),
    db.Column('userId', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
)

server_admins = db.Table(
    "server_admins",
    db.Column('serverId', db.Integer, db.ForeignKey(add_prefix_for_prod('servers.id'))),
    db.Column('userId', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
)

class Server(db.Model):
    __tablename__ = 'servers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    ownerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    preview_img = db.Column(db.String(255))

    users = db.relationship('User',
                        secondary = server_users,
                        backref = 'serverUsers')

    admins = db.relationship('User',
                        secondary=server_admins,
                        backref='serverAdmin')

    channels = db.relationship('Channel', back_populates='server')

# class Server_user(db.Model):
#     __tablename__ = 'server_users'

#     serverId = db.Column(db.Integer, db.ForeignKey('servers.id'))
#     userId = db.Column(db.Integer, db.ForeignKey('users.id'))



# class Server_admin(db.Model):
#     __tablename__ = 'server_admins'

#     serverId = db.Column(db.Integer, db.ForeignKey('servers.id'))
#     userId = db.Column(db.Integer, db.ForeignKey('users.id'))

    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.ownerId,
            'name': self.name,
            'preview_img': self.preview_img,

        }
