from django.contrib import admin
from blog.models import AccessTokens, Image

admin.site.register(Image)

class AccessTokensAdmin(admin.ModelAdmin):
  list_display = ('token', 'user_id', 'bad_times', 'time', 'last_access_time')

admin.site.register(AccessTokens, AccessTokensAdmin)
