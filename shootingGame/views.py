from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from requests import request

#####
from .game import getPlayerNum

# Create your views here.
def main(request):
    return render(request, 'index.html')

@api_view(['GET', 'POST'])
def update(request):
    if request.method == 'GET':
        return Response({"num": getPlayerNum()})
    elif request.method == 'POST':
        print (request.data)
        return Response(status=status.HTTP_200_OK)