# Generated by Django 3.2.7 on 2021-11-12 00:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('auctions', '0002_tracking'),
    ]

    operations = [
        migrations.CreateModel(
            name='Buys',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(default=django.utils.timezone.now)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='product_buys', to='auctions.list')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='usuario_buys', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
