from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import Video, Comment, WatchLater, Subscription
from .serializers import UserSerializer, VideoSerializer, CommentSerializer, WatchLaterSerializer
from django.http import HttpResponse
from django.http import HttpResponse
from django.urls import reverse_lazy
from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Video

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    if username and password:
        user = authenticate(username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user': UserSerializer(user).data
            })
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    return Response({'error': 'Username and password required'}, status=status.HTTP_400_BAD_REQUEST)

class VideoListCreateView(generics.ListCreateAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class VideoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    
    def get(self, request, *args, **kwargs):
        video = self.get_object()
        video.views += 1
        video.save()
        return super().get(request, *args, **kwargs)

@api_view(['POST'])
def toggle_like(request, pk):
    try:
        video = Video.objects.get(id=pk)
        if request.user in video.likes.all():
            video.likes.remove(request.user)
            liked = False
        else:
            video.likes.add(request.user)
            video.dislikes.remove(request.user)
            liked = True
        return Response({'liked': liked, 'likes_count': video.likes.count()})
    except Video.DoesNotExist:
        return Response({'error': 'Video not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def toggle_watch_later(request, pk):
    try:
        video = Video.objects.get(id=pk)
        watch_later, created = WatchLater.objects.get_or_create(
            user=request.user, video=video
        )
        if not created:
            watch_later.delete()
            added = False
        else:
            added = True
        return Response({'added': added})
    except Video.DoesNotExist:
        return Response({'error': 'Video not found'}, status=status.HTTP_404_NOT_FOUND)
    

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def watch_later_list(request):
    # Get all WatchLater entries for the current user
    watch_later_items = WatchLater.objects.filter(user=request.user)
    videos = [item.video for item in watch_later_items]
    serializer = VideoSerializer(videos, many=True)
    return Response(serializer.data)

class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    
    def get_queryset(self):
        video_id = self.kwargs['pk']
        return Comment.objects.filter(video_id=video_id)
    
    def perform_create(self, serializer):
        video_id = self.kwargs['pk']
        video = Video.objects.get(id=video_id)
        serializer.save(user=self.request.user, video=video)

@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def delete_video(request, pk):
    try:
        video = Video.objects.get(pk=pk, user=request.user)
        video.delete()
        return Response({"message": "Video deleted"}, status=status.HTTP_204_NO_CONTENT)
    except Video.DoesNotExist:
        return Response({"error": "Video not found"}, status=status.HTTP_404_NOT_FOUND)