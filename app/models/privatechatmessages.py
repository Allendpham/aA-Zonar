from .db import db, environment, SCHEMA
from sqlalchemy import func
import datetime
from .db import add_prefix_for_prod
import json

class PrivateChatMessage(db.Model):
    __tablename__= 'privatechatmessages'

    if environment == "production":
     __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    privateChatId = db.Column(db.Integer, db.ForeignKey('privatechats.id'), nullable=False)
    message = db.Column(db.String(500), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.datetime.now(), onupdate=datetime.datetime.now())

    privatechat = db.relationship('PrivateChat', back_populates='privatechatmessagelist')

    def to_dict(self):
      return {
        'id': self.id,
        'userId': self.userId,
        'privateChatId': self.privateChatId,
        'message': self.message,
        'createdAt': json.dumps(self.createdAt, default=str),
        'updatedAt': json.dumps(self.updatedAt, default=str)
    }
