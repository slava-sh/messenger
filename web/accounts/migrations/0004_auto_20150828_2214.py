# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import accounts.models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_logincode'),
    ]

    operations = [
        migrations.AlterField(
            model_name='logincode',
            name='code',
            field=models.CharField(verbose_name='code', max_length=20, default=accounts.models.generate_code, unique=True),
        ),
    ]
