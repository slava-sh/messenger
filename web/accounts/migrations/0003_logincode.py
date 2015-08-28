# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20150828_1427'),
    ]

    operations = [
        migrations.CreateModel(
            name='LoginCode',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(unique=True, max_length=20, verbose_name='code')),
                ('email', models.EmailField(max_length=63, verbose_name='email address')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
