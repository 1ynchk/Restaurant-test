from django.urls import path 

from .views import menu_page, search_pleat

urlpatterns = [
   path('menu/', menu_page, name='menu-page'),
   path('search/', search_pleat, name='search')
]