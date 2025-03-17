from django.shortcuts import render

# Create your views here.
def main_page(request):
    '''Возвращает главную страницу'''
    
    return render(request, 'main-page.html')
