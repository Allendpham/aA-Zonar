from .db import db, environment, SCHEMA
from sqlalchemy import func
import datetime
from .db import add_prefix_for_prod

class ChannelMessage(db.Model):
    __tablename__= 'channelmessages'

    if environment == "production":
     __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    channelId = db.Column(db.Integer, db.ForeignKey('channels.id'), nullable=False)
    message = db.Column(db.String(500), nullable=False)
    createdAt = db.Column(db.DateTime, server_default=func.now())
    updatedAt = db.Column(db.DateTime, server_default=func.now(), onupdate=datetime.datetime)

    channel = db.relationship('Channel', back_populates='channelmessagelist')
    channelusers = db.relationship('User', back_populates='userchannels')

    def to_dict(self):
      return {
        'id': self.id,
        'userId': self.userId,
        'channelId': self.channelId,
        'message': self.message,
        'createdAt': self.createdAt,
        'updatedAt': self.updatedAt
    }
