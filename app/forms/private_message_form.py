from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError



class PrivateMessageForm(FlaskForm):
    userId = IntegerField('userId', validators=[DataRequired()])
    privateChatId = IntegerField('channelId', validators=[DataRequired()])
    message = StringField('message', validators=[DataRequired(message='Please enter a message')])
