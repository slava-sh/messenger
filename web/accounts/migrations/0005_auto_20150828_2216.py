# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.core.validators


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_auto_20150828_2214'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(max_length=30, validators=[django.core.validators.RegexValidator('^[a-zA-Z0-9_-]+$')], help_text='You can use a-z, 0-9, underscores, and hyphens.', unique=True, verbose_name='username', null=True),
        ),
    ]
