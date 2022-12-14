from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Regexp
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(message='Please enter a username'), username_exists])
    email = StringField('email', validators=[Email(message='Please enter a valid e-mail address.'),DataRequired(message='Please enter an email'), user_exists])
    profile_pic = StringField('profile pic', validators=[Regexp('^$|(?:http\:|https\:)?\/\/.*\.(?:png|jpg|jpeg)', message = 'Please use a valid image URL (https://ex.jpg/jpeg/png)')])
    password = StringField('password', validators=[DataRequired()])
