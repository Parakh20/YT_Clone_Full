from django.contrib import admin
from .models import Video, Comment, WatchLater, Subscription
admin.site.register(Video)
admin.site.register(Comment)
admin.site.register(WatchLater)
admin.site.register(Subscription)
