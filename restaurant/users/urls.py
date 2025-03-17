from django.urls import path 
from django.contrib.auth.views import LogoutView

from .views import register_view, login_view, admin_profit

urlpatterns = [
  path('register/', register_view, name='register-view'),
  path('profit', admin_profit, name='profit'),
  path('login/', login_view, name='login-view'),
  path('logout/', LogoutView.as_view(next_page='main-page'), name='logout-view'), 
]