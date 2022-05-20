
# import functools
# from pickle import TRUE
# import sched
# import time
# import multiprocessing
# from multiprocessing import freeze_support
# import concurrent.futures
from operator import index
import threading


class Control:
    started = False
    UPS = 30   # update per socond

    def get_game_status(self):
        if self.started:
            return "started"
        else:
            return "stopped"
    # functions to control main game <<<<<<

    def start_looping(self):
        if not self.started:
            self.started = True
            set_interval(loop, 1/self.UPS)

    def stop_looping(self):
        self.started = False

    # >>>>>>>>>>>>>>>>>>>


class Player:
    username = ""
    x = 500
    y = 500
    speed = 500
    horizontal = 0
    vertical = 0
    vX = 0
    vY = 0
    #
    alpha = 0

    reloadTime = 400
    isReloaded = False

    def __init__(self, username):
        self.username = username

    def update(self):
        self.vX = self.speed * self.horizontal
        self.vY = self.speed * self.vertical
        #
        self.x += round(self.vX * (1/gameControl.UPS))
        self.y += round(self.vY * (1/gameControl.UPS))

    def get_details(self):
        detail = {
            "coodX": self.x,
            "coodY": self.y,
            "h": self.horizontal,
            "v": self.vertical
        }
        return detail

    def remote_update(self, data):
        self.horizontal = data["h"]
        self.vertical = data["v"]


class Bullet:
    is_active = True
    x = 0
    y = 0
    speed = 1500


class Game:
    mapWidth = 1000
    mapHeight = 1000
    players = []

    def add_new_player(self, username):
        self.players.append(Player(username))
        print(self.players)
        for i in range(len(self.players)):
            print("*** ", self.players[i].username)

    def get_map_info(self):
        return {"w": self.mapWidth, "h": self.mapHeight}

    def update(self):
        for i in range(len(self.players)):
            self.players[i].update()

            if self.players[i].x < 0:
                self.players[i].x = 0
            elif self.players[i].x > self.mapWidth:
                self.players[i].x = self.mapWidth
            if self.players[i].y < 0:
                self.players[i].y = 0
            elif self.players[i].y > self.mapHeight:
                self.players[i].y = self.mapHeight
################################
# interval function


def set_interval(func, sec):

    def func_wrapper():
        set_interval(func, sec)
        func()

    if gameControl.started:
        t = threading.Timer(sec, func_wrapper)
        t.start()
        return t


def get_player_details(username):
    index = -1
    for i in range(len(game1.players)):
        if game1.players[i].username == username:
            index = i
            break
    return game1.players[index].get_details()


def update_player(data, username):
    index = -1

    for i in range(len(game1.players)):
        if game1.players[i].username == username:
            index = i
            game1.players[i].remote_update(data)
            break
    return game1.players[index].get_details()


game1 = Game()
gameControl = Control()


def loop():
    game1.update()
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
# Garbages (may be useful later :)

# defining ionterval function
# s = sched.scheduler(time.time, time.sleep)
# def setInterval(sec):
#     def decorator(func):
#         @functools.wraps(func)
#         def wrapper(*argv, **kw):
#             setInterval(sec)(func)
#             func(*argv, **kw)
#         s.enter(sec, 1, wrapper, ())
#         return wrapper
#     s.run()
#     return decorator

# # @setInterval(sec=1/60)
# def do_something():
#     while(True):
#         time.sleep(1)
#         player.num += 1
#         print(player.num)


# def update():
#     player.update(player)
#     print(player.num)
# if __name__ == '__main__':
#     with concurrent.futures.ProcessPoolExecutor() as executor:
#         f1 = executor.submit(do_something)

#     # @setInterval(sec=1/60)
#     # def ddd():

#     for _ in range(10):

#         p = multiprocessing.Process(target=do_something)

#         p.start()

# freeze_support()

# ddd()

# @setInterval(sec=1/60)
# def testInterval():
#    do_something()

# testInterval()
