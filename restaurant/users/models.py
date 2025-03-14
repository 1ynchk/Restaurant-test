from django.db import models
from django.contrib.auth.models import AbstractUser
from django_ulid.models import default, ULIDField

# Create your models here.
class Users(AbstractUser):

    id = ULIDField(default=default, editable=False, primary_key=True)
    email = models.EmailField(unique=True, max_length=200)
    username = models.CharField(max_length=10, unique=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username'] 
    
    def __str__(self): 
        return self.email