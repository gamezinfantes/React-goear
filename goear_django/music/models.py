from django.db import models

# Create your models here.
class Track(models.Model):
    title = models.CharField(max_length=50)
    artist = models.ForeignKey('Artist')
    duration = models.IntegerField()
    file = models.FileField()

    class Meta:
        verbose_name = "Track"
        verbose_name_plural = "Tracks"

    def __str__(self):
        pass
    @staticmethod
    def displayDuration_to_sec(duration):
        d = duration.split(':')
        return (int(d[0])*60) + int(d[1])

class Artist(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        verbose_name = "Artist"
        verbose_name_plural = "Artists"

    def __str__(self):
        pass

class Album(models.Model):
    title = models.CharField(max_length=50)
    #cover = models.ImageField()
    tracks = models.ManyToManyField(Track)

    class Meta:
        verbose_name = "Album"
        verbose_name_plural = "Albums"

    def __str__(self):
        pass
    