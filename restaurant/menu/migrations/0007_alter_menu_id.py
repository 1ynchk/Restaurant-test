# Generated by Django 5.1.7 on 2025-03-16 23:55

import django_ulid.models
import ulid.api.api
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0006_alter_menu_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='menu',
            name='id',
            field=django_ulid.models.ULIDField(default=ulid.api.api.Api.new, editable=False, primary_key=True, serialize=False),
        ),
    ]
