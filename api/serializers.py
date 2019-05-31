from rest_framework import serializers

from .models import Author, Book

class AuthorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Author
        fields = ('id', 'first_name', 'last_name')

class BookSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(many=False)
    class Meta:
        model = Book
        fields = ('id', 'title', 'author', 'author_id', 'completed', 'year_won')
