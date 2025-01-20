from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

# models.py

class CustomUser(AbstractUser):
    groups = models.ManyToManyField(Group, related_name='customuser_set', blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name='customuser_set', blank=True)
    status = models.TextField(blank=True, null=True)
    fullname = models.CharField(max_length=80, blank=True, null=True)
    emp_id = models.CharField(max_length=50, blank=True, null=True)  # New attribute
    role = models.CharField(max_length=50, blank=True, null=True)    # New attribute
    task = models.TextField(blank=True, null=True)                   # New attribute
    
# class Task(models.Model):
#     title = models.CharField(max_length=100)
#     status = models.CharField(max_length=20)
#     assigned_to = models.ForeignKey(CustomUser, on_delete=models.CASCADE)


