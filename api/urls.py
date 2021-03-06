from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'authors', views.AuthorViewSet)
router.register(r'books', views.BookViewSet)
router.register(r'profiles', views.ProfileViewSet)
router.register(r'users', views.UserViewSet)
#  router.register(r'upload', views.UploadViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('user/', views.current_user),
    path('auth/', include('rest_framework.urls', namespace='rest_framework')),
]
