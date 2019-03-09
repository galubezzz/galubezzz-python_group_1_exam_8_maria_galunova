from django.db import models


class SoftDeleteManager(models.Manager):
    def active(self):
        return self.filter(is_deleted=False)

    def deleted(self):
        return self.filter(is_deleted=True)


# Create your models here.

class Task(models.Model):
    STATUS_1 = 'backlog'
    STATUS_2 = 'in progress'
    STATUS_3 = 'done'

    STATUS_CHOICES = (
        (STATUS_1, 'Очередь'),
        (STATUS_2, 'В работе'),
        (STATUS_3, 'Сделано')
    )
    summary = models.CharField(max_length=255, verbose_name='Название')
    description = models.TextField(max_length=2000, null=True, blank=True, verbose_name='Описание')
    due_date = models.DateTimeField(verbose_name='Дата дедлайна')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=STATUS_CHOICES[0], verbose_name='Статус')
    time_planned = models.DecimalField(null=True, blank=True, max_digits=5, decimal_places=1, verbose_name='Запланированное время')
    is_deleted = models.BooleanField(default=False)
    objects = SoftDeleteManager()

    def __str__(self):
        return self.summary


