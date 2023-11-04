# Generated by Django 4.1 on 2023-10-28 09:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('baseinfo', '0063_auto_20230719_1112'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='question',
            options={'verbose_name': 'Question', 'verbose_name_plural': 'Questions'},
        ),
        migrations.AlterField(
            model_name='questionimpact',
            name='maturity_level',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='question_impacts', to='baseinfo.maturitylevel'),
        ),
        migrations.AlterField(
            model_name='questionimpact',
            name='quality_attribute',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='question_impacts', to='baseinfo.qualityattribute'),
        ),
        migrations.AlterField(
            model_name='questionimpact',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='question_impacts', to='baseinfo.question'),
        ),
    ]