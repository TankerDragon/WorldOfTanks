
import functools
import sched, time
import multiprocessing

class Player:
    x = 0
    y = 0
    speed = 0
    alpha = 0
    velocity = {}
    reloadTime = 0
    isReloaded = False
    num = 0
    
    def __init__(self):
        self.x = 500
        self.y = 500
        self.speed = 500
        self.alpha = 0
        self.velocity = {}
        self.reloadTime = 400
        self.isReloaded = False
    
    def update(self):
        self.num += 1

class Bullet:
    is_active = True
    x = 0
    y = 0
    speed = 1500
    def __init__(self):
        self.is_active = True


class Game:
    player = Player
    

def getPlayerNum():
    return player.num


player = Player

#defining ionterval function
s = sched.scheduler(time.time, time.sleep)
def setInterval(sec):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*argv, **kw):
            setInterval(sec)(func)
            func(*argv, **kw)
        s.enter(sec, 1, wrapper, ())
        return wrapper
    s.run()
    return decorator

def do_something():
    print("speeeeeeeeeeeeeeep")
    time.sleep(1)
    print("Done")
# def update():
#     player.update(player)
#     print(player.num)
if __name__ == '__main__':

    @setInterval(sec=1/60)
    def ddd():
                
            p = multiprocessing.Process(target=do_something)
            
            p.start()

    ddd()

# @setInterval(sec=1/60)
# def testInterval():
#    do_something()

# testInterval()








