# Generated by Django 5.1.7 on 2025-03-16 21:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0006_alter_menu_id'),
        ('orders', '0002_remove_orders_items_alter_orders_table_number_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='orders',
            name='items',
            field=models.ManyToManyField(through='orders.ItemsMenuThrough', to='menu.menu'),
        ),
    ]
