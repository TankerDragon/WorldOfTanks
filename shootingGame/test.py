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
# #
# import threading

# class Player:
#     num = 0

# class ThreadJob(threading.Thread):
#     def __init__(self,callback,event,interval):
#         '''runs the callback function after interval seconds

#         :param callback:  callback function to invoke
#         :param event: external event for controlling the update operation
#         :param interval: time in seconds after which are required to fire the callback
#         :type callback: function
#         :type interval: int
#         '''
#         self.callback = callback
#         self.event = event
#         self.interval = interval
#         super(ThreadJob,self).__init__()

#     def run(self):
#         while not self.event.wait(self.interval):
#             self.callback()



# event = threading.Event()


# def foo():
#     player.num += 1

# player = Player()

  
    

# def get_num():
#     return player.num

# k = ThreadJob(foo,event,2)
# k.start()

# print ("It is non-blocking")