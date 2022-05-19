from django.urls import path
from . import views
urlpatterns = [
    path('', views.main, name='game'),
    path('login/', views.loginPage, name="login"),
    path('logout/', views.logoutUser, name="logout"),
    path('update/', views.update),
    path('game/', views.gameSettings, name="game-settings"),
    path('gameAPI/', views.game),
    path('new-user/', views.new_user, name='new-user')
]
