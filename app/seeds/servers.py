from app.models import db, Server, User, environment, SCHEMA, PrivateChat

def seed_servers():
    kyle = User(
        username='Kyle', email='kyle@aa.io', profile_pic='https://i.imgur.com/rJ6597s.jpg', password='password')
    ben = User(
        username='Ben', email='ben@aa.io', profile_pic='https://i.imgur.com/WdjhZJf.jpg', password='password')
    allen = User(
        username='Allen', email='allen@aa.io', profile_pic='https://i.imgur.com/yKao8W9.jpg', password='password')
    brin = User(
        username='Brin', email='brin@aa.io', profile_pic='https://i.imgur.com/on5VXW5.jpg' , password='password')
    tom = User(
        username='Tom', email='tom@myspace.io', profile_pic='https://i.imgur.com/9Icg4uz.jpg', password='password')


    db.session.add(kyle)
    db.session.add(ben)
    db.session.add(allen)
    db.session.add(brin)
    db.session.add(tom)
    db.session.commit()

    demo_server = Server(
        ownerId=4,
        name='demo server',
        preview_img='https://images-ext-2.discordapp.net/external/yUZyuXcKBeQEudd5TufFDa7CO3nWHjxjxeEfoN1my2Q/https/i.imgur.com/bJhQYx1.jpg?width=954&height=1193',
    )

    gaming_server = Server(
        ownerId=4,
        name='gaming server',
        preview_img='https://i.imgur.com/cPnjT2p.jpg',
    )

    anime_server = Server(
        ownerId=4,
        name='anime server',
        preview_img='https://i.imgur.com/o3bMibS.jpg',

    )

    sports_server = Server(
        ownerId=5,
        name='sports server',
        preview_img='https://i.imgur.com/pVSuGlu.jpg',

    )

    fantasy_server = Server(
        ownerId=5,
        name='fantasy server',
        preview_img='https://i.imgur.com/UvITjr8.jpg',

    )
    db.session.add(demo_server)
    db.session.add(gaming_server)
    db.session.add(anime_server)
    db.session.add(sports_server)
    db.session.add(fantasy_server)
    kyle.servers.append(demo_server)
    kyle.admin.append(demo_server)

    kyle.servers.append(gaming_server)
    kyle.admin.append(gaming_server)

    kyle.servers.append(anime_server)
    kyle.admin.append(anime_server)

    ben.servers.append(sports_server)
    ben.admin.append(sports_server)

    ben.servers.append(fantasy_server)
    ben.admin.append(fantasy_server)

    private_chat1 = PrivateChat()
    private_chat2 = PrivateChat()
    private_chat3 = PrivateChat()

    db.session.add(private_chat1)
    db.session.add(private_chat2)
    db.session.add(private_chat3)
    kyle.privatechats.append(private_chat1)
    ben.privatechats.append(private_chat1)
    kyle.privatechats.append(private_chat2)
    allen.privatechats.append(private_chat2)
    kyle.privatechats.append(private_chat3)
    brin.privatechats.append(private_chat3)

    db.session.commit()

def undo_servers():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM servers")

    db.session.commit()

def undo_server_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.server_users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM server_users")

    db.session.commit()

def undo_server_admins():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.server_admins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM server_admins")

    db.session.commit()

def undo_private_chats():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.privatechats RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM privatechats")

    db.session.commit()
