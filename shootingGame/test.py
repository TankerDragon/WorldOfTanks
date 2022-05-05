import time
import multiprocessing
 



def do_something():
    print("speeeeeeeeeeeeeeep")
    time.sleep(1)
    print("Done")



if __name__ == '__main__':
        
    p1 = multiprocessing.Process(target=do_something)
    p2 = multiprocessing.Process(target=do_something)
    p1.start()
    p2.start()

