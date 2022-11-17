from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError



class MessageForm(FlaskForm):
    userId = IntegerField('userId', validators=[DataRequired()])
    channelId = IntegerField('channelId', validators=[DataRequired()])
    message = StringField('message', validators=[DataRequired(message='Please enter a message')])
