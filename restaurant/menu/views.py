from django.shortcuts import render
from django.http import JsonResponse

from .models import Menu

# Create your views here.
def menu_page(request):
    '''Возвращает страницу с меню'''
   
    queryset = Menu.objects.select_related('cat').all()
     
    return render(request, 'menu_page.html', {'menu': queryset})

def search_pleat(request):
    '''Поиск блюда по поиску'''
    
    search = request.GET.get('q', '').strip()
    
    if search:
        queryset = Menu.objects.select_related('cat').filter(name__icontains=search)
    else:
        queryset = Menu.objects.all()
        
    result = list(queryset.values('id', 'name', 'desc', 'price', 'cat__name'))
    
    for item in result:
        item['id'] = str(item['id'])
        item['cat'] = item.pop('cat__name')
        
    return JsonResponse({'results': result})