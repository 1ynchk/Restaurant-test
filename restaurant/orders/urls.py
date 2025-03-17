from django.urls import path 

from .views import (
   orders_page, 
   orders_post, 
   orders_list_page, 
   order_delete,
   order_update,
   order_search
   )

urlpatterns = [
   path('orders/', orders_page, name='orders-view'),
   path('orders/post/', orders_post, name='orders-post-view'),
   path('orders-list/', orders_list_page, name='orders-list-view'),
   path('order/delete/', order_delete, name='order-delete-view'),
   path('order/update/<int:order_id>/', order_update, name='order-update'),
   path('order/search/', order_search, name='order-search')
]