from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import relationship
from flask_login import UserMixin
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.types import Integer
from .servers import server_admins, server_users
from .privatechat import private_chat_users

# Base = declarative_base() <--- USELESS


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profile_pic = db.Column(db.String(255))
    hashed_password = db.Column(db.String(255), nullable=False)


    servers = db.relationship('Server',
                        secondary=server_users,
                        back_populates='users')

    admin = db.relationship('Server',
                        secondary=server_admins,
                        back_populates='admins')

    userchannels = db.relationship('ChannelMessage', back_populates='channelusers')

    privatechats = db.relationship('PrivateChat',
                    secondary=private_chat_users,
                    backref='userPrivateChats')


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
            'email': self.email,
            'profile_pic': self.profile_pic
        }
