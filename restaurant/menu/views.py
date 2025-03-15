from django.shortcuts import render
from django.http import JsonResponse

from .models import Menu

# Create your views here.
def menu_page(request):
   
    queryset = Menu.objects.select_related('cat').all()
     
    return render(request, 'menu_page.html', {'menu': queryset})

def search_pleat(request):
    
    search = request.GET.get('q', '').strip()
    print(search)
    
    if search:
        queryset = Menu.objects.filter(name__icontains=search)
    else:
        queryset = Menu.objects.all()
        
    result = list(queryset.values('id', 'name', 'desc', 'price'))
    
    for item in result:
        item['id'] = str(item['id'])
        
    return JsonResponse({'results': result})