# Generated by Django 4.0.4 on 2023-03-20 00:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('accounts', '0015_alter_contact_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contact',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='user_id', serialize=False, to=settings.AUTH_USER_MODEL),
        ),
    ]
