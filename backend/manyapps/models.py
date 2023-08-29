from django.db import models

class urlShortener(models.Model):
    longurl = models.CharField(max_length=255)
    shorturl = models.CharField(max_length=10)

    def __str__(self):
        return self.shorturl
    
from django.db import models

class File(models.Model):
    file = models.FileField()
    uploaded_at = models.DateTimeField(auto_now_add=True)
