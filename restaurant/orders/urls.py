from django.urls import path 

from .views import orders_page

urlpatterns = [
   path('orders/', orders_page, name='orders-view') 
]