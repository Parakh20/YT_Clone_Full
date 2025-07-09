from django.urls import path
from . import views
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import WatchLater
from .serializers import VideoSerializer

urlpatterns = [
    path("register/", views.register_user),
    path("login/", views.login_user),
    path("videos/", views.VideoListCreateView.as_view()),
    path("videos/<int:pk>/", views.VideoDetailView.as_view()),
    path("videos/<int:pk>/like/", views.toggle_like),
    path("videos/<int:pk>/watch-later/", views.toggle_watch_later),
    path("videos/<int:pk>/comments/", views.CommentListCreateView.as_view()),
    path("watch-later/", views.watch_later_list),
    path("videos/<int:pk>/delete/", views.delete_video, name="delete_video"),

]


