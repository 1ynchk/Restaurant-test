from django.db import models

# Create your models here.
class Orders(models.Model):

    amount_tables = 30
    
    table_choices = [(x, str(x)) for x in range(1, amount_tables)]
    status_choices = [
        ('В ожидании', 'В ожидании'),
        ('Готов', 'Готов'),
        ('Оплачено', 'Оплачено'),
    ]

    user = models.ForeignKey('users.Users', on_delete=models.CASCADE)
    table_number = models.IntegerField(choices=table_choices)
    items = models.ManyToManyField('menu.Menu', through='ItemsMenuThrough')
    total_price = models.IntegerField()
    status = models.CharField(max_length=20, choices=status_choices, default='В ожидании')
    
    def __str__(self):
        return self.user.email   
    
class ItemsMenuThrough(models.Model): 
    
    amount = models.PositiveBigIntegerField(default=1)
    item = models.ForeignKey('menu.Menu', on_delete=models.CASCADE, null=True)
    order = models.ForeignKey(Orders, on_delete=models.CASCADE, null=True)