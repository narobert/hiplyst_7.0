from django.contrib import admin
from blog.models import Post, Image

# Register your models here.

class PostAdmin(admin.ModelAdmin):
  list_display = ['name', 'dsc']
  search_fields = ['name', 'dsc', 'time']
  date_hierarchy = 'time'
  save_on_top = True
		
admin.site.register(Post, PostAdmin)
admin.site.register(Image)
