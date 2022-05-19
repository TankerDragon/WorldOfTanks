from math import gamma
from multiprocessing import context
from django.shortcuts import redirect, render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from requests import request

#####
from .game import get_player_details, update_player, gameControl, game1
from .forms import CreateUserForm
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required
# start_looping, stop_looping, , get_game_status,

@login_required(login_url='login')
def main(request):
    game1.add_new_player(request.user)
    return render(request, 'index.html')

def loginPage(request):
    if request.user.is_authenticated:
        return redirect('game')
    else:
        if request.method == 'POST':
            username = request.POST.get('username')
            password = request.POST.get('password')

            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                return redirect('game')
            else:
                messages.info(request, 'Username OR password is incorrect')

        context = {}
        return render(request, 'login.html', context)

@login_required(login_url='login')
def logoutUser(request):
    logout(request)
    return redirect('login')


def new_user(request):
    user_form = CreateUserForm()
    if request.method == 'POST':
        user_form = CreateUserForm(request.POST)
        if user_form.is_valid():
            user_form.save()
            return redirect('login')

    context = {'form': user_form}
    return render(request, 'new-user.html', context)
   

@login_required(login_url='login')
@api_view(['GET', 'POST'])
def update(request):
    if request.method == "GET":
        return Response(get_player_details(request.user))
    elif request.method == "POST":
        # print(request.user)
        return Response(update_player(request.data, request.user))
    return Response(status=status.HTTP_200_OK)

@login_required(login_url='login')
def gameSettings(request):
    context = {
        "status": gameControl.get_game_status()
    }
    return render(request, 'game-settings.html', context)

@login_required(login_url='login')
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
