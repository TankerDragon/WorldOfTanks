from django.urls import path
from . import views
urlpatterns = [
    path('', views.main, name='index'),
    path('update/', views.update),
    path('game/', views.gameSettings, name="game-settings"),
    path('gameAPI/', views.game),
    path('username/', views.username, name='username')
]
