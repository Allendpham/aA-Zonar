from app.models import db, Channel, environment, SCHEMA

def seed_channels():
   channel1 = Channel(name='gaming', serverId=1)
   channel2 = Channel(name='food', serverId=1)
   channel3 = Channel(name='fun', serverId=1)

   db.session.add(channel1)
   db.session.add(channel2)
   db.session.add(channel3)
   db.session.commit()

def undo_channels():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM channels")

    db.session.commit()
