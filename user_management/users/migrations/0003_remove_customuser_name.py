# Generated by Django 5.1.3 on 2025-01-02 16:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_remove_question_created_by_customuser_address_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='name',
        ),
    ]