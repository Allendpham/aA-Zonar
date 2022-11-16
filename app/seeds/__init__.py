from flask.cli import AppGroup
from .users import seed_users, undo_users
from .servers import seed_servers, undo_servers, undo_server_users, undo_server_admins, undo_private_chats
from .channels import seed_channels, undo_channels
from .messages import seed_messages, undo_messages
# from .privatechats import seed_private_chats, undo_private_chats
from .privatechatmessages import seed_private_chat_messages, undo_private_chat_messages
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_servers()
        undo_channels()
        undo_server_users()
        undo_server_admins()
        undo_messages()
        undo_private_chats()
        undo_private_chat_messages()
    seed_users()
    # Add other seed functions here
    seed_servers()
    seed_channels()
    seed_messages()
    # seed_private_chats()
    seed_private_chat_messages()



# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_servers()
    undo_channels()
    undo_server_users()
    undo_server_admins()
    undo_private_chats()
    undo_private_chat_messages()
