from app.models import db, PrivateChat, environment, SCHEMA

def seed_private_chats():
   private_chat1 = PrivateChat()
   private_chat2 = PrivateChat()
   private_chat3 = PrivateChat()

   db.session.add(private_chat1)
   db.session.add(private_chat2)
   db.session.add(private_chat3)

def undo_private_chats():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.privatechats RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM privatechats")

    db.session.commit()
