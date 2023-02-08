from django.db import models

from baseinfo.models.basemodels import QualityAttribute, AssessmentSubject
from baseinfo.models.profilemodels import AssessmentProfile
    
class QualityAttributeImage(models.Model):
    image = models.FileField(upload_to='attribute/images')
    attribute = models.ForeignKey(QualityAttribute, on_delete=models.CASCADE, related_name='images')


class SubjectImage(models.Model):
    image = models.FileField(upload_to='subject/images')
    subject = models.ForeignKey(AssessmentSubject, on_delete=models.CASCADE, related_name='images')

class ProfileImage(models.Model):
    image = models.FileField(upload_to='profile/images')
    profile = models.ForeignKey(AssessmentProfile, on_delete=models.CASCADE, related_name='images')