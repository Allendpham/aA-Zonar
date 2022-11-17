from app.models import db, environment, SCHEMA, PrivateChatMessage

def seed_private_chat_messages():
  msg1 = PrivateChatMessage(userId=4, privateChatId=1, message='test message1')
  msg2 = PrivateChatMessage(userId=5, privateChatId=1, message='test message2')
  msg3 = PrivateChatMessage(userId=4, privateChatId=1, message='test message3')
  msg4 = PrivateChatMessage(userId=5, privateChatId=1, message='test message4')
  msg5 = PrivateChatMessage(userId=4, privateChatId=1, message='test message5')
  msg6 = PrivateChatMessage(userId=4, privateChatId=2, message='test message6')
  msg7 = PrivateChatMessage(userId=6, privateChatId=2, message='test message7')
  msg8 = PrivateChatMessage(userId=4, privateChatId=2, message='test message8')
  msg9 = PrivateChatMessage(userId=6, privateChatId=2, message='test message9')

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

def undo_private_chat_messages():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.privatechatmessages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM privatechatmessages")

    db.session.commit()
