from app.models import db, Server, User, environment, SCHEMA

def seed_servers():
    kyle = User(
        username='kyle', email='kyle@aa.io', password='password')
    ben = User(
        username='ben', email='ben@aa.io', password='password')
    allen = User(
        username='allen', email='allen@aa.io', password='password')
    brin = User(
        username='brin', email='brin@aa.io', password='password')

    db.session.add(kyle)
    db.session.add(ben)
    db.session.add(allen)
    db.session.add(brin)

    demo_server = Server(
        ownerId=1,
        name='demo server',
        preview_img='https://images-ext-2.discordapp.net/external/yUZyuXcKBeQEudd5TufFDa7CO3nWHjxjxeEfoN1my2Q/https/i.imgur.com/bJhQYx1.jpg?width=954&height=1193',
    )

    gaming_server = Server(
        ownerId=1,
        name='gaming server',
        preview_img='https://images-ext-2.discordapp.net/external/yUZyuXcKBeQEudd5TufFDa7CO3nWHjxjxeEfoN1my2Q/https/i.imgur.com/bJhQYx1.jpg?width=954&height=1193',
    )

    anime_server = Server(
        ownerId=1,
        name='anime server',
        preview_img='https://images-ext-2.discordapp.net/external/yUZyuXcKBeQEudd5TufFDa7CO3nWHjxjxeEfoN1my2Q/https/i.imgur.com/bJhQYx1.jpg?width=954&height=1193',

    )

    sports_server = Server(
        ownerId=1,
        name='sports server',
        preview_img='https://images-ext-2.discordapp.net/external/yUZyuXcKBeQEudd5TufFDa7CO3nWHjxjxeEfoN1my2Q/https/i.imgur.com/bJhQYx1.jpg?width=954&height=1193',

    )

    fantasy_server = Server(
        ownerId=1,
        name='fantasy server',
        preview_img='https://images-ext-2.discordapp.net/external/yUZyuXcKBeQEudd5TufFDa7CO3nWHjxjxeEfoN1my2Q/https/i.imgur.com/bJhQYx1.jpg?width=954&height=1193',

    )
    db.session.add(demo_server)
    db.session.add(gaming_server)
    db.session.add(anime_server)
    db.session.add(sports_server)
    db.session.add(fantasy_server)
    kyle.servers.append(demo_server)
    kyle.admin.append(demo_server)

    db.session.commit()

def undo_servers():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM servers")

    db.session.commit()

# def undo_server_users():
#     if environment == "production":
#         db.session.execute(
#             f"TRUNCATE table {SCHEMA}.server_users RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute("DELETE FROM server_users")

#     db.session.commit()

# def undo_server_admins():
#     if environment == "production":
#         db.session.execute(
#             f"TRUNCATE table {SCHEMA}.server_admins RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute("DELETE FROM server_admins")

#     db.session.commit()
