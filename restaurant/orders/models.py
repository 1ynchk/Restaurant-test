from django.db import models

# Create your models here.
class Orders(models.Model):

    amount_tables = 10
    
    table_choices = [(x, str(x)) for x in range(1, amount_tables)]
    status_choices = [
        ('В ожидании', 'В ожидании'),
        ('Готов', 'Готов'),
        ('Оплачено', 'Оплачено'),
    ]

    user = models.ForeignKey('users.Users', on_delete=models.CASCADE)
    table_number = models.IntegerField(choices=table_choices)
    items = models.ManyToManyField('menu.Menu')
    total_price = models.IntegerField()
    status = models.CharField(max_length=20, choices=status_choices)
    
    def __str__(self):
        return self.user.email   