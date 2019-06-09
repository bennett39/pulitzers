from rest_framework import serializers

from .models import Author, Book, Profile
from django.contrib.auth.models import User


class AuthorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Author
        fields = ('id', 'first_name', 'last_name')

#  class BookSerializer(serializers.ModelSerializer):
    #  author = serializers.StringRelatedField(many=False)
    #  class Meta:
        #  model = Book
        #  fields = ('id', 'title', 'author', 'author_id', 'completed', 'year_won')

class BookSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Book
        fields = ('title', 'author', 'completed', 'year_won')

class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Profile
        fields = ('user', 'books_read')

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('username',)
