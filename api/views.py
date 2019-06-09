from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required

from .serializers import AuthorSerializer, BookSerializer, ProfileSerializer, UserSerializer #, UploadSerializer
from .models import Author, Book, Profile


class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all().order_by('last_name')
    serializer_class = AuthorSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all().order_by('-year_won')
    serializer_class = BookSerializer

#  class UploadViewSet(viewsets.ModelViewSet):
    #  queryset = Book.objects.all().order_by('-year_won')
    #  serializer_class = UploadSerializer

@login_required
@api_view(['GET'])
def current_user(request):
    user = request.user
    profile = Profile.objects.filter(user=user).first()
    return Response({ 'user_id': user.id, 'profile_id': profile.id })
