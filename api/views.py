from rest_framework import viewsets

from .serializers import AuthorSerializer, BookSerializer
from .models import Author, Book


class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all().order_by('last_name')
    serializer_class = AuthorSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all().order_by('year_won')
    serializer_class= BookSerializer
