# Generated by Django 5.1.4 on 2024-12-14 08:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='passowrd',
            new_name='password',
        ),
        migrations.RenameField(
            model_name='user',
            old_name='userName',
            new_name='username',
        ),
    ]
