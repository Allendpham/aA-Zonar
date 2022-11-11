from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey, Table



Base = declarative_base()

server_users = Table(
    'server_users',
    Base.metadata,
    Column('serverId', ForeignKey('servers.id'), primary_key=True),
    Column('userId', ForeignKey('users.id'), primary_key=True),
)

class Server(db.Model):
    __tablename__ = 'servers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    ownerId = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    preview_img = db.Column(db.String(255))
    admin_Ids = db.Column(db.String(255))

    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.ownerId,
            'name': self.name,
            'preview_img': self.preview_img,
            'admin_Ids': self.admin_Ids
        }
