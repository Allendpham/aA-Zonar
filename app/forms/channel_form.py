from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError


class ChannelForm(FlaskForm):
   name = StringField("channel name", validators=[DataRequired(message="Please enter a channel name")])
   serverId = IntegerField('serverId', validators=[DataRequired()])
