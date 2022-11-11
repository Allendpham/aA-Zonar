from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError



class ServerForm(FlaskForm):
    ownerId = IntegerField('ownerId', validators=[DataRequired()])
    name = StringField('server name', validators=[DataRequired(message='Please enter a server name')])
    preview_img = StringField('preview img')
