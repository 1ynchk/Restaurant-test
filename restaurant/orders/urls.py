from django.urls import path 

from .views import orders_page, orders_post

urlpatterns = [
   path('orders/', orders_page, name='orders-view'),
   path('orders/post/', orders_post, name='orders-post-view') 
]