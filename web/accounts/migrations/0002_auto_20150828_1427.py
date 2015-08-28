# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.core.validators


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(unique=True, max_length=63, verbose_name='email address'),
        ),
        migrations.AlterField(
            model_name='user',
            name='is_staff',
            field=models.BooleanField(help_text='Designates whether the user can log in to the admin site.', verbose_name='staff status', default=False),
        ),
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(validators=[django.core.validators.RegexValidator('^[a-zA-Z0-9_-]+$')], help_text='You can use a-z, 0-9, underscores, and hyphens.', unique=True, max_length=30, verbose_name='username'),
        ),
    ]
