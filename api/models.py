from django.db import models

class Author(models.Model):
    first_name = models.CharField(max_length=60)
    last_name = models.CharField(max_length=60)

    def __str__(self):
        return f"{self.last_name}, {self.first_name[:1]}."


class Book(models.Model):
    title = models.CharField(max_length=140)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
