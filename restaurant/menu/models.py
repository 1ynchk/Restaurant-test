from django.db import models
from django_ulid.models import default, ULIDField

# Create your models here.
class Menu(models.Model):
    
    id = ULIDField(primary_key=True, default=default, editable=False)
    name = models.CharField(max_length=555)
    desc = models.CharField(max_length=2000, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    cat = models.ForeignKey('Category', on_delete=models.SET_NULL, null=True)
    
    def __str__(self):
        return self.name 
    
class Category(models.Model): 
    
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name