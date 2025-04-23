from django.contrib import admin
from .models import *

admin.site.register(Movies)
admin.site.register(Cinema)
admin.site.register(Screening)
admin.site.register(Booking)