from django.db import models
from django.core.urlresolvers import reverse
	
class Image(models.Model):
  path = models.ImageField(upload_to='%Y/%m/%d')
	
class Post(models.Model):
  name = models.CharField(max_length=200) 
  dsc = models.CharField(max_length=200)
  time = models.DateTimeField()
  imgID = models.ForeignKey(Image)
