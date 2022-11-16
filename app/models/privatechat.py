from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.orm import relationship
from .db import add_prefix_for_prod


private_chat_users = db.Table(
    'private_chat_users',
    db.Column('privatechatId', db.Integer, db.ForeignKey('privatechats.id')),
    db.Column('userId', db.Integer, db.ForeignKey('users.id')),
)

class PrivateChat(db.Model):
   __tablename__ = 'privatechats'

   if environment == "production":
      __table_args__ = {'schema': SCHEMA}

   id = db.Column(db.Integer, primary_key=True)

   users = db.relationship('User',
                    secondary = private_chat_users,
                    backref = 'privateChatUsers', lazy=False)
   privatechatmessagelist = db.relationship('PrivateChatMessage', back_populates='privatechat', lazy=False)

   def to_dict(self):
    return {
        'id': self.id,
        'users': [user.to_dict() for user in self.users],
        'messages': [pm.to_dict() for pm in self.privatechatmessagelist]
    }
