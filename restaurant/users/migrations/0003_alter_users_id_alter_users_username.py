# Generated by Django 5.1.7 on 2025-03-13 22:54

import django_ulid.models
import ulid.api.api
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_alter_users_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='id',
            field=django_ulid.models.ULIDField(default=ulid.api.api.Api.new, editable=False, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='users',
            name='username',
            field=models.CharField(max_length=10),
        ),
    ]
