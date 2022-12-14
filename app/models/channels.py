from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.orm import relationship
from .db import add_prefix_for_prod


class Channel(db.Model):
   __tablename__ = 'channels'

   if environment == "production":
      __table_args__ = {'schema': SCHEMA}

   id = db.Column(db.Integer, primary_key=True)
   name = db.Column(db.String(255), nullable=False)
   serverId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('servers.id')), nullable=False)

   server = db.relationship('Server', back_populates='channels')
   channelmessagelist = db.relationship('ChannelMessage', back_populates='channel', lazy=False, cascade="all, delete")
   def to_dict(self):
    return {
        'id': self.id,
        'name': self.name,
        'serverId': self.serverId
    }
