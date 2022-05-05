# WorldOfTanks

i found a interval function in python and added some useful function in order not to interrupt server
this loop can be controlled and that must be stopped before server is gonna stop

import threading

class Control:
    looping = True

control = Control()

def stop_looping():
    control.looping = False


class Player:
    num = 0

def set_interval(func, sec):
    def func_wrapper():
        set_interval(func, sec)
        func()
    
    if control.looping:
        t = threading.Timer(sec, func_wrapper)
        t.start()
        return t

player = Player()

def fff():
    player.num += 1
    

def get_num():
    return player.num



set_interval(fff, 3)
