from django.shortcuts import render, get_object_or_404
from django.db.models import F, Sum, Q
from django.contrib.auth.decorators import login_required
from collections import Counter
from django.http import JsonResponse
import json

from .models import Orders, ItemsMenuThrough
from menu.models import Menu

# Create your views here.
@login_required
def orders_page(request):
    '''Возвращает страницу с созданием заказа'''

    amount_tables = Orders.amount_tables
    menu = Menu.objects.all()
    taken_tables = Orders.objects.values_list('table_number', flat=True)
    
    return render(request, 'orders_page.html', 
                {
                    'amount_tables': amount_tables, 
                    'menu': menu,
                    'taken_tables': list(taken_tables)          
                }
                  ) 

@login_required
def orders_list_page(request): 
    '''Возвращает страницу с заказами пользователя'''

    queryset = Orders.objects.prefetch_related('items').filter(user=request.user).annotate(
        total_sum=Sum(F('itemsmenuthrough__amount') * F('itemsmenuthrough__item__price'))
    )

    return render(request, 'orders_list_page.html', {'orders': queryset})

@login_required
def order_delete(request):
    '''Удаляет заказ пользователя'''
    
    if request.method == 'DELETE': 
        
        data = json.loads(request.body.decode('utf-8'))
        order = data['order']
        
        order_obj = get_object_or_404(Orders, pk=order)
        order_obj.delete()
        
        return JsonResponse({'results': 'Заказ успешно удален'})
    
@login_required
def order_update(request, order_id):
    '''Обновление статуса заказа'''
    
    if request.method == 'PUT':
        data = json.loads(request.body.decode('utf-8'))
        status = data.get('status')

        if status not in dict(Orders.status_choices):
            return JsonResponse({'error': 'Неверный статус'}, status=400)

        order = get_object_or_404(Orders, pk=order_id)

        order.status = status
        order.save()

        return JsonResponse({'results': 'Статус заказа успешно обновлен'})
    
    return JsonResponse({'error': 'Метод не поддерживается'}, status=405)

@login_required
def order_search(request):
    '''Поиск заказа пользователя'''
   
    if request.method == 'GET':
        
        search = request.GET.get('q', '').strip()
        if search:
            queryset = Orders.objects.prefetch_related('items').filter(Q(Q(id=search) | Q(status__icontains=search)) & Q(user=request.user))
        else:
            queryset = Orders.objects.all()
        result = []

        for order in queryset:
            order_data = {
                'id': str(order.id),
                'table_number': order.table_number,
                'status': order.status,
                'total_price': order.total_price,
                'items': []
            }

            for item_through in order.items.through.objects.filter(order=order):
                    item = item_through.item 
                    order_data['items'].append({
                        'id': str(item.id),
                        'name': item.name,
                        'price': item.price,
                        'amount': item_through.amount
                    }) 

            result.append(order_data)

        return JsonResponse({'results': result}) 
        
    return JsonResponse({'result': f'Метод {request.method} не разрешен'})
    
   
@login_required 
def orders_post(request):
    '''Добавляет заказ пользователя'''
    
    if request.method == 'POST':

        data = json.loads(request.body.decode('utf-8'))
        table_id = int(data['table_id'])
        order = data['order']
        total_price = data['total_price']

        order_obj = Orders(
            total_price=total_price,
            user=request.user, 
            table_number=table_id, 
            status='В ожидании')

        order_obj.save()

        # ! Переделать !
        order_items = []
        
        queryset_menu = Menu.objects.filter(id__in=order)
        count = dict(Counter(order))
        final_dict = {}
        for obj in queryset_menu: 
            for key, val in count.items(): 
                if obj.id == key: 
                    final_dict[key] = {'obj': obj, 'count': val}
        
        for key in final_dict.keys():
            print()
            order_items.append(ItemsMenuThrough(
                item=final_dict[key]['obj'], 
                order=order_obj, 
                amount=final_dict[key]['count']
                )) 
            
        ItemsMenuThrough.objects.bulk_create(order_items)
                
        return JsonResponse({'result': 'Заказ успешно был создан'})
    return JsonResponse({'result': f'Метод {request.method} не разрешен'})