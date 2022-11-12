from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import relationship
from flask_login import UserMixin
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.types import Integer

Base = declarative_base()

server_users = Table(
    'server_users',
    Base.metadata,
    Column('serverId', Integer, ForeignKey(
        add_prefix_for_prod('servers.id')), primary_key=True),
    Column("userId", Integer, ForeignKey(
        add_prefix_for_prod('users.id')), primary_key=True),
)

server_admins = Table(
    'server_admins',
    Base.metadata,
    Column('serverId', Integer, ForeignKey(
        add_prefix_for_prod('servers.id')), primary_key=True),
    Column('userId', Integer, ForeignKey(
        add_prefix_for_prod('users.id')), primary_key=True),
)


class User(Base, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    
    servers = relationship('Server',
                        secondary=server_users,
                        back_populates='users')
    
    admins = relationship('Server',
                        secondary=server_admins,
                        back_populates='admins')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
        



class Server(Base):
    __tablename__ = 'servers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    ownerId = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    preview_img = db.Column(db.String(255))

    users = relationship('User',
                        secondary=server_users,
                    back_populates='servers')

    admins = relationship('User',
                        secondary=server_admins,
                        back_populates='admins')

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
