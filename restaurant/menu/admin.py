from django.contrib import admin

from .models import Menu, Category

# Register your models here.
@admin.register(Menu)
class AdminMenu(admin.ModelAdmin):
    pass

@admin.register(Category)
class AdminCategory(admin.ModelAdmin):
    pass