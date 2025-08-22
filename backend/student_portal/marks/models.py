from django.db import models
from students.models import Student
from datetime import date

class Marks(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    subject = models.CharField(max_length=100)
    marks = models.IntegerField()
    exam_date = models.DateField(default=date.today)
    
    def __str__(self):
        return f"{self.student.name} - {self.subject} : {self.marks}"
