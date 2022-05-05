from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from requests import request

#####
from .test import get_num, stop_looping
def main(request):
    return render(request, 'index.html')

@api_view(['GET', 'POST'])
def update(request):
    if request.method == 'GET':
        print(get_num())
        return Response({"num": get_num()})
    elif request.method == 'POST':
        print (request.data)
        stop_looping()
        return Response(status=status.HTTP_200_OK)



