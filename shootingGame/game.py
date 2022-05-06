
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
    FPS = 30


class Player:
    x = 500
    y = 500
    speed = 100
    horizontal = 1
    vertical = 0
    vX = 0
    vY = 0
    #
    alpha = 0

    reloadTime = 0
    isReloaded = False
    num = 0

    def update(self):
        self.num += 1
        #
        self.vX = round(self.speed * self.horizontal)
        self.vY = round(self.speed * self.vertical)
        #
        self.x += round(self.vX * (1/control.FPS))
        self.y += round(self.vY * (1/control.FPS))

    def get_details(self):
        detail = {
            "coodX": self.x,
            "coodY": self.y
        }
        return detail


class Bullet:
    is_active = True
    x = 0
    y = 0
    speed = 1500


class Game:
    mapWidth = 1000
    mapHeight = 1000
    player = Player()

    def update(self):
        self.player.update()

################################
# interval function


def set_interval(func, sec):

    def func_wrapper():
        set_interval(func, sec)
        func()

    if control.started:
        t = threading.Timer(sec, func_wrapper)
        t.start()
        return t


def start_looping():
    if not control.started:
        control.started = True
        set_interval(loop, 1/control.FPS)


def stop_looping():
    control.started = False


def get_num():
    return game.player.num


def get_player_details():
    return game.player.get_details()


game = Game()
control = Control()


def loop():
    game.update()
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
#

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
