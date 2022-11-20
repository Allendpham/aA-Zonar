from flask_wtf import FlaskForm
from flask import request
from flask_login import current_user
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError, Regexp
from app.models import Server
def server_name_exists(form, field):
    name = field.data

    server_name = Server.query.filter(Server.name == name).first()
    
    if server_name:
        raise ValidationError('Server name is already in use.')

class ServerForm(FlaskForm):
    ownerId = IntegerField('ownerId', validators=[DataRequired()])
    name = StringField('server name', validators=[DataRequired(message='Please enter a server name'), server_name_exists])
    preview_img = StringField('preview img', validators=[Regexp('(?:http\:|https\:)?\/\/.*\.(?:png|jpg|jpeg)', message = 'Please use a valid image URL (https://ex.jpg/jpeg/png)')])
