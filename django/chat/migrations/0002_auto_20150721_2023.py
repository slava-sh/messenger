# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='conversation',
            options={'ordering': ['-updated_at']},
        ),
        migrations.AddField(
            model_name='conversation',
            name='updated_at',
            field=models.DateTimeField(default=datetime.datetime(2015, 7, 21, 20, 23, 35, 248083), db_index=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='message',
            name='time',
            field=models.DateTimeField(default=datetime.datetime(2015, 7, 21, 20, 23, 44, 614588), auto_now_add=True),
            preserve_default=False,
        ),
    ]
