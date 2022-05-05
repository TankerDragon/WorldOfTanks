from django.urls import path
from . import views
urlpatterns = [
    path('', views.main),
    path('update/', views.update)
]