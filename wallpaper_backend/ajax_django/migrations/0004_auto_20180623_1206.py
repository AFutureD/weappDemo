# -*- coding: utf-8 -*-
# Generated by Django 1.11.10 on 2018-06-23 12:06
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ajax_django', '0003_auto_20180623_1204'),
    ]

    operations = [
        migrations.RenameField(
            model_name='wallpaperinfo',
            old_name='index',
            new_name='countID',
        ),
    ]