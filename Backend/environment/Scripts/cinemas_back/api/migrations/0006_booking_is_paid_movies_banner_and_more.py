# Generated by Django 5.1.7 on 2025-04-23 22:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_remove_booking_is_paid_alter_booking_created_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking',
            name='is_paid',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='movies',
            name='banner',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='booking',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
