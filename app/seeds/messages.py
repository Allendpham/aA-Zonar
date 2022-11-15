from app.models import db, environment, SCHEMA, ChannelMessage

def seed_messages():
  msg1 = ChannelMessage(userId=1, channelId=1, message='test message1')
  msg2 = ChannelMessage(userId=2, channelId=2, message='test message2')
  msg3 = ChannelMessage(userId=3, channelId=3, message='test message3')
  msg4 = ChannelMessage(userId=4, channelId=1, message='test message4')
  msg5 = ChannelMessage(userId=5, channelId=2, message='test message5')
  msg6 = ChannelMessage(userId=2, channelId=4, message='test message6')
  msg7 = ChannelMessage(userId=1, channelId=3, message='test message7')
  msg8 = ChannelMessage(userId=3, channelId=2, message='test message8')
  msg9 = ChannelMessage(userId=4, channelId=1, message='test message9')

  db.session.add_all([
  msg1,
  msg2,
  msg3,
  msg4,
  msg5,
  msg6,
  msg7,
  msg8,
  msg9])
  db.session.commit()

def undo_messages():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.channelmessages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM channelmessages")

    db.session.commit()
