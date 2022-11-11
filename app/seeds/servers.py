from app.models import db, Server, environment, SCHEMA


def seed_servers():
    demo_server = Server(
        ownerId=1, 
        name='demo server', 
        preview_img='https://images-ext-2.discordapp.net/external/yUZyuXcKBeQEudd5TufFDa7CO3nWHjxjxeEfoN1my2Q/https/i.imgur.com/bJhQYx1.jpg?width=954&height=1193', 
        admin_Ids='[1, 2, 3]'
    )
    
    gaming_server = Server(
        ownerId=1, 
        name='gaming server', 
        preview_img='https://images-ext-2.discordapp.net/external/yUZyuXcKBeQEudd5TufFDa7CO3nWHjxjxeEfoN1my2Q/https/i.imgur.com/bJhQYx1.jpg?width=954&height=1193', 
        admin_Ids='[1, 2, 3]'
    )
    
    anime_server = Server(
        ownerId=1, 
        name='anime server', 
        preview_img='https://images-ext-2.discordapp.net/external/yUZyuXcKBeQEudd5TufFDa7CO3nWHjxjxeEfoN1my2Q/https/i.imgur.com/bJhQYx1.jpg?width=954&height=1193', 
        admin_Ids='[1, 2, 3]'
    )
    
    sports_server = Server(
        ownerId=1, 
        name='sports server', 
        preview_img='https://images-ext-2.discordapp.net/external/yUZyuXcKBeQEudd5TufFDa7CO3nWHjxjxeEfoN1my2Q/https/i.imgur.com/bJhQYx1.jpg?width=954&height=1193', 
        admin_Ids='[1, 2, 3]'
    )
    
    fantasy_server = Server(
        ownerId=1, 
        name='fantasy server', 
        preview_img='https://images-ext-2.discordapp.net/external/yUZyuXcKBeQEudd5TufFDa7CO3nWHjxjxeEfoN1my2Q/https/i.imgur.com/bJhQYx1.jpg?width=954&height=1193', 
        admin_Ids='[1, 2, 3]'
    )
    
    db.session.add(demo_server)
    db.session.add(gaming_server)
    db.session.add(anime_server)
    db.session.add(sports_server)
    db.session.add(fantasy_server)
    db.session.commit()
    
def undo_servers():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM servers")
        
    db.session.commit()