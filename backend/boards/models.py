from django.db import models
from .manager import CardManager, ListManager

# Create your models here.
class List(models.Model):
    title = models.CharField(max_length=255)
    order = models.IntegerField(default=0)

    objects = ListManager()

class Card(models.Model):
    to_list = models.ForeignKey(
            List,
            related_name='cards',
            on_delete=models.CASCADE
            )
    title = models.CharField(max_length=255)
    order = models.IntegerField(default=0)

    objects = CardManager()


