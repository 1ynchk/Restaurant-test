from django.urls import path 

from .views import main_page, register_view, login_view


urlpatterns = [
   path('', main_page, name='main-page'),
   path('register/', register_view, name='register-view'),
   path('login/', login_view, name='login-view')
]