from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from collections import Counter
from django.http import JsonResponse
import json

from .models import Orders, ItemsMenuThrough
from menu.models import Menu

# Create your views here.
@login_required
def orders_page(request):

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
def orders_post(request):
    
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
                
        # print(final_dict)
        
        return JsonResponse({'result': 'Order successfully created'})