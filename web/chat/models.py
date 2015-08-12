from django.db import models
from django.conf import settings
from django.utils import timezone


class Conversation(models.Model):
    name = models.CharField(max_length=50)
    members = models.ManyToManyField(settings.AUTH_USER_MODEL,
                                     related_name='conversations')
    updated_at = models.DateTimeField(db_index=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.updated_at = timezone.now()
        super().save(*args, **kwargs)

    @models.permalink
    def get_absolute_url(self):
        return ('chat:conversation', [self.pk])


class Message(models.Model):
    text = models.TextField()
    time = models.DateTimeField()
    conversation = models.ForeignKey(Conversation, related_name='messages')
    author = models.ForeignKey(settings.AUTH_USER_MODEL)

    def __str__(self):
        return self.text

    def save(self, *args, **kwargs):
        if self.pk is None:
            self.time = timezone.now()
            self.conversation.updated_at = None
            self.conversation.save()
        super().save(*args, **kwargs)
