from rest_framework import viewsets

from .serializers import AuthorSerializer, BookSerializer, ProfileSerializer, UserSerializer #, UploadSerializer
from .models import Author, Book, Profile
from django.contrib.auth.models import User


class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all().order_by('last_name')
    serializer_class = AuthorSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all().order_by('-year_won')
    serializer_class = BookSerializer

#  class UploadViewSet(viewsets.ModelViewSet):
    #  queryset = Book.objects.all().order_by('-year_won')
    #  serializer_class = UploadSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all().order_by('user')
    serializer_class = ProfileSerializer

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
