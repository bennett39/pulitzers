from django.db import models

class Author(models.Model):
    first_name = models.CharField(max_length=60)
    last_name = models.CharField(max_length=60)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Book(models.Model):
    title = models.CharField(max_length=140)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False, blank=False, null=False)
    year_won = models.PositiveIntegerField(default=0, blank=False, null=False)

    def __str__(self):
        return self.title
