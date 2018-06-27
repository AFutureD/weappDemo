from django.db import models


# Create your models here.
class WallpaperInfo(models.Model):
    ID = models.CharField(max_length=200, primary_key = True,db_index =True)
    uploadTime = models.DateTimeField()
    downloadpath = models.CharField(max_length = 1023)
    countID = models.IntegerField()
