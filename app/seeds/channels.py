from app.models import db, Channel, environment, SCHEMA

def seed_channels():
   channel1 = Channel(name='General', serverId=1)
   channel2 = Channel(name='Food', serverId=1)
   channel3 = Channel(name='Fun', serverId=1)
   channel4 = Channel(name='General', serverId=2)
   channel5 = Channel(name='General', serverId=3)
   channel6 = Channel(name='General', serverId=4)
   channel7 = Channel(name='General', serverId=5)

   db.session.add_all([channel1, channel2, channel3, channel4, channel5, channel6, channel7])
   db.session.commit()

def undo_channels():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM channels")

    db.session.commit()
