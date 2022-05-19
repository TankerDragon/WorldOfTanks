from math import gamma
from multiprocessing import context
from django.shortcuts import redirect, render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from requests import request

#####
from .game import get_player_details, update_player, gameControl, game1
# start_looping, stop_looping, , get_game_status,


def main(request):
    return render(request, 'index.html')


def username(request):
    if request.method == 'POST':
        print(request.POST['username'])
        return redirect('username')
    return render(request, 'username.html')


@api_view(['GET', 'POST'])
def update(request):
    if request.method == "GET":
        return Response(get_player_details())
    elif request.method == "POST":
        # print(request.data)
        return Response(update_player(request.data))
    return Response(status=status.HTTP_200_OK)


def gameSettings(request):
    context = {
        "status": gameControl.get_game_status()
    }
    return render(request, 'game-settings.html', context)


@api_view(['GET', 'POST'])
def game(request):
    if request.method == 'GET':
        # print(get_num())
        return Response({"status": gameControl.get_game_status(), "map": game1.get_map_info()})
    elif request.method == 'POST':
        print(request.data)
        if request.data['game'] == 'start':
            gameControl.start_looping()
            return Response(status=status.HTTP_200_OK)

        elif request.data['game'] == 'stop':
            gameControl.stop_looping()
            return Response(status=status.HTTP_200_OK)

        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
