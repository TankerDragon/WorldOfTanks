
# import functools
# from pickle import TRUE
# import sched
# import time
# import multiprocessing
# from multiprocessing import freeze_support
# import concurrent.futures
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
    player = Player()

    def get_map_info(self):
        return {"w": self.mapWidth, "h": self.mapHeight}

    def update(self):
        self.player.update()

        if self.player.x < 0:
            self.player.x = 0
        elif self.player.x > self.mapWidth:
            self.player.x = self.mapWidth
        if self.player.y < 0:
            self.player.y = 0
        elif self.player.y > self.mapHeight:
            self.player.y = self.mapHeight
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


def get_player_details():
    return game1.player.get_details()


def update_player(data):
    game1.player.remote_update(data)
    return game1.player.get_details()


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
