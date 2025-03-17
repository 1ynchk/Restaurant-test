from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static
from users.urls import urlpatterns as users_patterns
from orders.urls import urlpatterns as orders_patterns
from main.urls import urlpatterns as main_patterns
from menu.urls import urlpatterns as menu_patterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(users_patterns), name='users'),
    path('', include(orders_patterns), name='orders'),
    path('', include(main_patterns), name='main'),
    path('', include(menu_patterns), name='menu')
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)